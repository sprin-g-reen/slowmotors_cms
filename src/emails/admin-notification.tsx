import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Preview,
  Hr,
  Section,
} from "@react-email/components";

interface AdminNotificationProps {
  formName: string;
  submissionData: Record<string, unknown>;
  formId: string;
}

export const AdminNotification: React.FC<AdminNotificationProps> = ({
  formName,
  submissionData,
  formId,
}) => {
  return (
    <Html>
      <Head />
      <Preview>New Lead: {formName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Submission</Heading>
          <Text style={text}>
            A new submission has been received for the form: <strong>{formName}</strong>
          </Text>
          <Text style={subtext}>Form ID: {formId}</Text>

          <Hr style={hr} />

          <Section style={dataSection}>
            <Heading as="h2" style={h2}>Submission Data:</Heading>
            <ul style={list}>
              {Object.entries(submissionData).map(([key, value]) => (
                <li key={key} style={listItem}>
                  <strong>{key}:</strong> {String(value)}
                </li>
              ))}
            </ul>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AdminNotification;

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
  fontSize: "24px",
  fontWeight: "bold",
  margin: "30px 0",
  textAlign: "center" as const,
};

const h2 = {
  color: "#333",
  fontSize: "20px",
  fontWeight: "bold",
  marginTop: "0",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const subtext = {
  color: "#666",
  fontSize: "14px",
  margin: "8px 0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const dataSection = {
  padding: "20px",
  backgroundColor: "#f9f9f9",
  borderRadius: "5px",
};

const list = {
  listStyleType: "none",
  padding: "0",
  margin: "0",
};

const listItem = {
  marginBottom: "10px",
  fontSize: "15px",
  color: "#333",
};
