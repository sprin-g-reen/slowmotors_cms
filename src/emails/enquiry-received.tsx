import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Preview,
  Section,
  Hr,
} from "@react-email/components";

interface EnquiryReceivedProps {
  name: string;
  formName: string;
}

export const EnquiryReceived: React.FC<EnquiryReceivedProps> = ({
  name,
  formName,
}) => {
  return (
    <Html>
      <Head />
      <Preview>We received your enquiry - Slow Motors</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Enquiry Received</Heading>
          <Text style={text}>Hi {name},</Text>
          <Text style={text}>
            Thank you for contacting Slow Motors. We have received your submission
            via the <strong>{formName}</strong> form.
          </Text>
          <Section>
            <Text style={text}>
              One of our team members will review your details and get back to you
              shortly.
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Slow Motors - High End Vehicle Inventory
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EnquiryReceived;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  margin: "16px 0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
