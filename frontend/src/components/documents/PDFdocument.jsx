// src/components/PDFDocument.js
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    border: '1px solid black',
  },
  text: {
    fontFamily: 'Verdana',
  },
});

const PDFDocument = ({ content }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.text}>{content}</Text>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
