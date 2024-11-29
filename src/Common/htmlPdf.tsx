import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { FormatDate } from './sortDate';
import { FormatRupiahFromText } from './formatRupiah';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  logo: {
    fontSize: 24,
    fontFamily: 'Times-Roman',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Times-Roman',
    letterSpacing: 2,
  },
  billingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  billingInfo: {
    gap: 4,
  },
  billingHeader: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  text: {
    fontSize: 12,
    marginBottom: 4,
  },
  rightAligned: {
    textAlign: 'right',
  },
  table: {
    marginBottom: 40,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingVertical: 12,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  tableCol1: {
    flex: 2,
    fontSize: 12,
  },
  tableCol2: {
    flex: 1,
    fontSize: 12,
    textAlign: 'right',
  },
  summarySection: {
    marginTop: 32,
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalRow: {
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: 'black',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  signature: {
    fontSize: 20,
    fontFamily: 'Times-Roman',
    marginBottom: 8,
  },
});

type Typedata = {
    "id": number,
    "employee_id": number,
    "daily_salary": number,
    "absence": number,
    "bonus": number,
    "tax": number,
    "total_hour": number,
    "total": number,
    "created_at": string,
}

export const MyDocument = ({data}:{data: Typedata}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>&</Text>
        <Text style={styles.title}>PAYROLL</Text>
      </View>

      {/* Billing Information */}
      <View style={styles.billingSection}>
        <View style={styles.billingInfo}>
          <Text style={styles.text}>PT.LOREM</Text>
          <Text style={styles.text}>JL. Jalan-jalan No-100</Text>
        </View>
        <View style={[styles.billingInfo, styles.rightAligned]}>
          <Text style={styles.text}>Invoice No. {data.id}</Text>
          <Text style={styles.text}>Date: {FormatDate(data.created_at)}</Text>
        </View>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableCol1}>Description</Text>
          <Text style={styles.tableCol2}></Text>
          <Text style={styles.tableCol2}></Text>
          <Text style={styles.tableCol2}>Total</Text>
        </View>
        
        <View style={styles.tableRow}>
          <Text style={styles.tableCol1}>Absence</Text>
          <Text style={styles.tableCol2}></Text>
          <Text style={styles.tableCol2}></Text>
          <Text style={styles.tableCol2}>1</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol1}>Tax</Text>
          <Text style={styles.tableCol2}></Text>
          <Text style={styles.tableCol2}></Text>
          <Text style={styles.tableCol2}>{data.tax} %</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCol1}>Total hour</Text>
          <Text style={styles.tableCol2}></Text>
          <Text style={styles.tableCol2}></Text>
          <Text style={styles.tableCol2}>{data?.total_hour} hour</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCol1}>Bonus</Text>
          <Text style={styles.tableCol2}></Text>
          <Text style={styles.tableCol2}></Text>
          <Text style={styles.tableCol2}>{FormatRupiahFromText(String(data.bonus))}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCol1}>Daily salary</Text>
          <Text style={styles.tableCol2}></Text>
          <Text style={styles.tableCol2}></Text>
          <Text style={styles.tableCol2}>{FormatRupiahFromText(String(data.daily_salary))}</Text>
        </View>

        {/* Summary */}
        <View style={styles.summarySection}>
          {/* <View style={styles.summaryRow}>
            <Text style={styles.text}>Subtotal</Text>
            <Text style={styles.text}>$500</Text>
          </View> */}
          {/* <View style={styles.summaryRow}>
            <Text style={styles.text}>Tax (0%)</Text>
            <Text style={styles.text}>$0</Text>
          </View> */}
          <View style={styles.totalRow}>

paddingTop: '8px',            <Text>Total</Text>
            <Text style={styles.tableCol2}>{FormatRupiahFromText(String(data.total))}</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      {/* <View style={styles.footer}>
        <View style={styles.billingInfo}>
          <Text style={styles.billingHeader}>PAYMENT INFORMATION</Text>
          <Text style={styles.billingHeader}>Briard Bank</Text>
          <Text style={styles.billingHeader}>Account Name: Samira Hadid</Text>
          <Text style={styles.billingHeader}>Account No.: 123-456-7890</Text>
          <Text style={styles.billingHeader}>Pay by: 5 July 2025</Text>
        </View>
        <View style={[styles.billingInfo, styles.rightAligned]}>
          <Text style={styles.signature}>Samira Hadid</Text>
        </View>
      </View> */}
    </Page>
  </Document>
);


export const DownloadPdf = async (data: Typedata) => {
  const doc = <MyDocument data={data} />; // Make sure your PDF structure is in this component
  // Generate the PDF blob
  const pdfBlob = pdf(undefined); // add any necessary document setup here if needed
  pdfBlob?.updateContainer(doc);
  // pdfBlob?.toBlob().then((blob) => {
  //   const url = URL.createObjectURL(blob);
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.setAttribute("download", "filename.pdf"); // Choose your filename here
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // });
  return await pdfBlob?.toBlob();
};