import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { render } from "@react-email/render";
import { ConfirmationEmail } from "@/emails/ConfirmationEmail";

const Confirmation = () => {
  const [searchParams] = useSearchParams();
  const nome = searchParams.get("nome") || "Convidado";
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    render(
      <ConfirmationEmail nome={nome} siteUrl={window.location.origin} />
    ).then(setHtml);
  }, [nome]);

  if (!html) return null;

  return (
    <iframe
      srcDoc={html}
      style={{ width: "100%", height: "100vh", border: "none", display: "block" }}
      title="Preview do Email de Confirmação"
    />
  );
};

export default Confirmation;
