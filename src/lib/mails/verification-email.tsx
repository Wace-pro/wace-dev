import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Link,
  Button,
} from "@react-email/components";
import { render } from "@react-email/render";

interface VerifyEmailProps {
  username?: string;
  verifyUrl: string;
}

export const VerifyEmail = ({ username = "there", verifyUrl }: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email to activate your Wace account</Preview>
      <Body style={main}>
        <Container style={wrapper}>
          <Section style={section}>
            <Text style={heading}>👋 Welcome to Wace, {username}!</Text>

            <Text style={text}>
              Please verify your email address to activate your account and get started.
            </Text>

            <Button href={verifyUrl} style={button}>
              Verify Your Email
            </Button>

            <Text style={text}>
              If the button doesn’t work, paste this link into your browser:
            </Text>

            <Link href={verifyUrl} style={link}>
              {verifyUrl}
            </Link>

            <Text style={footer}>Need help? Just reply to this email.</Text>
            <Text style={footer}>— The Wace Team 🚀</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export async function getHTML (username:string,verifyUrl:string) {
    return await render(<VerifyEmail username={username} verifyUrl={verifyUrl} />);
} 

// ========== Styles ==========
const main = {
  backgroundColor: "#000000",
  fontFamily: "Helvetica, Arial, sans-serif",
  padding: "40px 0",
  color: "#ffffff",
};

const wrapper = {
  width: "100%",
  maxWidth: "500px",
  margin: "0 auto",
  backgroundColor: "#111111",
  padding: "32px",
  borderRadius: "12px",
  boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
};

const section = {
  textAlign: "center" as const,
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold" as const,
  marginBottom: "20px",
  color: "#4A9EFF",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.6",
  marginBottom: "24px",
  color: "#CCCCCC",
};

const button = {
  backgroundColor: "#4A9EFF",
  color: "#000000",
  padding: "14px 28px",
  fontSize: "16px",
  fontWeight: "bold" as const,
  borderRadius: "8px",
  textDecoration: "none",
  display: "inline-block",
  marginBottom: "24px",
};

const link = {
  fontSize: "14px",
  color: "#4A9EFF",
  wordBreak: "break-all" as const,
  display: "block",
  marginBottom: "24px",
};

const footer = {
  fontSize: "13px",
  color: "#777777",
  marginBottom: "8px",
};
