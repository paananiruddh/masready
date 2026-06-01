const BREVO_EMBED_URL =
  "https://75232578.sibforms.com/serve/MUIFAHtIRt-B7-A2JWAVSXzXbsIyZmDLOE2TzmbffSn476swcFcWsGucu6KrllQW9qtONrnIMrGqAIP4Iq1SG6Ghtq8_JVp355My8vdANM4HG_oQtQiEwg4q8EhbhYoTy8QgQ7CRWIu65dArnwRq2urrxvTIsHzWd90UvT56Xo6aQeI1-HLT7alAYabVkxvSKwHNxX0PfMKCGzRXwg==?isEmbedded=1&locale=en";

export default function LeadCaptureForm() {
  return (
    <div className="max-w-xl mx-auto">
      <iframe
        src={BREVO_EMBED_URL}
        frameBorder="0"
        scrolling="auto"
        allowFullScreen
        style={{
          display: "block",
          width: "100%",
          minHeight: "480px",
          border: "none",
          borderRadius: "16px",
          overflow: "hidden",
        }}
        title="Get the MASReady demo link"
      />
    </div>
  );
}
