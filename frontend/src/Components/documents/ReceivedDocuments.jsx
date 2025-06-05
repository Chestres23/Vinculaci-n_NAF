import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../../assets/styles/ReceivedDocuments.css';

const ReceivedDocuments = () => {
    const { userData } = useAuth();
    const [userMessages, setUserMessages] = useState([]);
    const [departmentMessages, setDepartmentMessages] = useState([]);
    const [activeTab, setActiveTab] = useState('users');
    const [expandedDocument, setExpandedDocument] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const [error, setError] = useState(''); 
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchReceivedMessages = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/documents/received', {
                    params: { receiverId: userData.id }
                });
                setUserMessages(response.data.userMessages);
                setDepartmentMessages(response.data.departmentMessages);
            } catch (error) {
                console.error('Error al obtener los mensajes recibidos:', error);
                setError('Error al obtener los mensajes recibidos.');
            }
        };

        if (userData) {
            fetchReceivedMessages();
        }
    }, [userData]);

    const handleExpandDocument = async (document) => {
        const { id, pdfFileName } = document;
    
        if (!pdfFileName) {
            console.error("Nombre de archivo PDF indefinido para el documento con ID:", id);
            setError("El documento no tiene un archivo PDF asociado.");
            return;
        }
    
        setExpandedDocument(null);
        setPdfUrl('');
    
        try {
            const finalPdfFileName = encodeURIComponent(pdfFileName.endsWith('.pdf') ? pdfFileName : `${pdfFileName}.pdf`);
            const pdfUrl = `http://localhost:3001/api/documents/view-pdf/${finalPdfFileName}`;
            setPdfUrl(pdfUrl);
            setExpandedDocument(document);
        } catch (error) {
            console.error('Error al obtener la URL del PDF:', error);
            setError('Error al cargar el documento PDF.');
        }
    };

    const handleCollapseDocument = () => {
        setExpandedDocument(null);
        setPdfUrl('');
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setExpandedDocument(null); // Restablecer el documento expandido al cambiar de pestaña
        setPdfUrl(''); // Restablecer la URL del PDF
    };

    return (
        <div className="received-documents">
            <h2 className="documents-title">Documentos Recibidos</h2>
            <div className="tabs">
                <button 
                    className={`tab ${activeTab === 'users' ? 'active' : ''}`} 
                    onClick={() => handleTabChange('users')}
                >
                    Recibidos de Usuarios
                </button>
                <button 
                    className={`tab ${activeTab === 'departments' ? 'active' : ''}`} 
                    onClick={() => handleTabChange('departments')}
                >
                    Recibidos de Departamentos
                </button>
            </div>
            <div className="tab-content">
                {!expandedDocument && activeTab === 'users' && (
                    <>
                        {userMessages.length > 0 ? (
                            userMessages.map(msg => (
                                <div 
                                    key={msg.id} 
                                    className="document-item"
                                    onClick={() => handleExpandDocument(msg)}
                                >
                                    <p><strong>De:</strong> {msg.sender}</p>
                                    <p><strong>Asunto:</strong> {msg.content}</p>
                                    <p><strong>Archivo:</strong> {msg.pdfFileName}</p>
                                    <p><strong>Fecha:</strong> {new Date(msg.timestamp).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>No hay documentos recibidos de usuarios.</p>
                        )}
                    </>
                )}
                {!expandedDocument && activeTab === 'departments' && (
                    <>
                        {departmentMessages.length > 0 ? (
                            departmentMessages.map(msg => (
                                <div 
                                    key={msg.id} 
                                    className="document-item"
                                    onClick={() => handleExpandDocument(msg)}
                                >
                                    <p><strong>De:</strong> {msg.sender} ({msg.senderAbdep})</p>
                                    <p><strong>Para Departamento:</strong> {msg.department}</p>
                                    <p><strong>Asunto:</strong> {msg.content}</p>
                                    <p><strong>Archivo:</strong> {msg.pdfFileName}</p>
                                    <p><strong>Fecha:</strong> {new Date(msg.timestamp).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>No hay documentos recibidos de departamentos.</p>
                        )}
                    </>
                )}
                {expandedDocument && (
                    <div className="expanded-document">
                        <button className="collapse-button" onClick={handleCollapseDocument}>Cerrar Documento</button>
                        <p><strong>De:</strong> {expandedDocument.sender}</p>
                        {expandedDocument.senderAbdep && (
                            <p><strong>Desde:</strong> {expandedDocument.senderAbdep}</p>
                        )}
                        <p><strong>MENSAJE:</strong> {expandedDocument.content}</p>
                        <p><strong>Fecha:</strong> {new Date(expandedDocument.timestamp).toLocaleString()}</p>
                        <div className="pdf-container">
                            {pdfUrl ? (
                                <iframe
                                    src={pdfUrl}
                                    style={{ width: "100%", height: "500px", border: "none" }}
                                    title="PDF Viewer"
                                />
                            ) : (
                                <p>Cargando documento...</p> 
                            )}
                        </div>
                    </div>
                )}
            </div>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default ReceivedDocuments;
