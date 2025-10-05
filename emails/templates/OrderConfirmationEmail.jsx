import { EmailLayout } from '../components/Layout';
import { CustomButton } from '../components/Button';
import { Section, Text, Row, Column, Img } from '@react-email/components';
import { formatStringToDashCase } from '@/utils/formatters';

export function OrderConfirmationEmail({ firstName = "User", orderData }) {
  return (
    <EmailLayout title="Order Confirmed!">
      <Section>
        
        <Text style={paragraphStyle}>
          Dear {firstName},
        </Text>

        <Text style={paragraphStyle}>
            We received your order!
        </Text>

        <Text style={paragraphStyle}>
          Thank you for showing trust in our products.
        </Text>

        <Text style={paragraphStyle}>
          You can see more order details in Account ➔ Order History.
        </Text>
        
        <CustomButton href={`${process.env.NEXT_PUBLIC_BASE_URL}/account`}>
          Account Page
        </CustomButton>

        <Section style={summaryStyle}>
          <Text style={headingStyle}>Order #{orderData.id}</Text>

          {orderData.items.map((item, index) => (
            <Row key={index} style={itemStyle}>
              <Column style={firstColStyle}>
                {/* Nested table for image + text on same line */}
                <table style={nestedTableStyle}>
                  <tr>
                    <td style={imageCellStyle}>
                      <Img 
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${formatStringToDashCase(item.name)}.webp`} 
                        alt={item.name} 
                        width="75" 
                        height="75" 
                        style={imageStyle}
                      />
                    </td>
                    <td style={textCellStyle}>
                      <Text style={itemTextStyle}>{item.name}</Text>
                    </td>
                  </tr>
                </table>
              </Column>
              <Column style={colsStyle}>
                <Text style={itemQuantityStyle}>x {item.quantity}</Text>
              </Column>
              <Column style={colsStyle}>
                <Text style={itemPriceStyle}>${item.totalPrice}</Text>
              </Column>
            </Row>
          ))}

          <Row style={totalStyle}>
            <Column>
              <Text style={totalTextStyle}>Total: ${orderData.total}</Text>
            </Column>
          </Row>
        </Section>

      </Section>
    </EmailLayout>
  );
}

const summaryStyle = {
  borderRadius: '8px',
  margin: '20px 0',
};

const headingStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '15px',
};

const itemStyle = {
  marginBottom: '10px',
  paddingBottom: '10px',
  borderBottom: '1px solid #e9ecef',
};

const firstColStyle = {
  width: '50%',
};

const colsStyle = {
  width: '25%',
};

const nestedTableStyle = {
  width: '100%',
  border: '0',
  borderCollapse: 'collapse',
};

const imageCellStyle = {
  width: '75px',
  paddingRight: '15px',
  verticalAlign: 'middle', 
};

const textCellStyle = {
  verticalAlign: 'middle', 
};

const itemTextStyle = {
  fontSize: '14px',
  margin: 0,  
};

const itemQuantityStyle = {
  fontSize: '14px',
  margin: 0,  
  width: '100%',
  textAlign: 'center'
};

const imageStyle = {
  display: 'block', 
};

const itemPriceStyle = {
  fontSize: '14px',
  margin: 0,
  textAlign: 'end',
  paddingRight: '20px',
};

const totalStyle = {
  marginTop: '0',
  paddingTop: '15px',
  borderTop: '2px solid #dee2e6',
};

const totalTextStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'end',
  margin: 0,
};

const paragraphStyle = {
  fontSize: '16px',
  lineHeight: '1.5',
};