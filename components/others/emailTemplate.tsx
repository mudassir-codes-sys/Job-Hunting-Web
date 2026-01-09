import {
  Html,
  Body,
  Container,
  Heading,
  Text,
  Img,
} from "@react-email/components";
export type emailProps = {
  name: string;
  code: number;
};
function EmailTemplate({ name, code }: emailProps) {
  return (
    <Html>
      <Body style={{ backgroundColor: "#f6f9fc", padding: "20px" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <Img
            src="https://yourdomain.com/vercel.svg"
            width="80"
            alt="Logo"
            style={{ margin: "0 auto 16px" }}
          />

          <Heading style={{ marginBottom: "12px" }}>
            Welcome {name.toUpperCase()}
          </Heading>

          <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>

          <Text style={{ fontSize: "16px", marginTop: "12px" }}>
            Your verification code is:
          </Text>

          <Text
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              letterSpacing: "4px",
              marginTop: "8px",
            }}
          >
            {code}
          </Text>

          <Text style={{ fontSize: "12px", color: "#888", marginTop: "16px" }}>
            This code will expire in 5 minutes.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default EmailTemplate;
