const maskEmail = (email: string): string => {
  const [name, domain] = email.split("@");
  const visible = name.slice(0, Math.ceil(name.length / 2));
  const hidden = "*".repeat(Math.ceil(name.length - visible.length));
  return `${visible}${hidden}@${domain}`;
};

export default maskEmail;
