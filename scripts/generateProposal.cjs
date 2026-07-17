const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType } = require('docx');
const path = require('path');

async function createProposal() {
  const logoPath = path.join(__dirname, '..', 'public', 'logo.jpg');
  const logoBuffer = fs.readFileSync(logoPath);

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                data: logoBuffer,
                transformation: {
                  width: 150,
                  height: 150,
                },
              }),
            ],
          }),
          new Paragraph({
            text: "PROPOSAL FOR INTERACTIVE CYBER SAFETY WORKSHOP",
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({ text: "Empowering Students for a Safer Digital Future", italics: true, size: 28 }),
            ],
          }),
          
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            text: "1. Overview & Objective",
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun("In today's highly connected world, students are spending more time online than ever before. While the internet is an incredible resource for learning and entertainment, it also exposes them to sophisticated risks such as phishing attacks, deepfakes, and online scams. "),
              new TextRun("The objective of this free, 1-hour interactive workshop is to equip students with the practical skills needed to identify and defend against these modern digital threats."),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            text: "2. The Cyber Awareness Lab",
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun("Instead of boring lectures, this workshop uses the "),
              new TextRun({ text: "Cyber Awareness Lab", bold: true }),
              new TextRun(" — a custom-built, gamified simulation tool. Students will safely experience simulated cyber threats in real-time. By interacting with these harmless simulations, they learn to spot red flags in a risk-free environment."),
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            text: "Key Modules Covered:",
            spacing: { before: 100, after: 100 },
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun({ text: "Phishing & Fake Logins:", bold: true }), new TextRun(" Spotting deceptive links and fraudulent websites.")]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun({ text: "Social Engineering:", bold: true }), new TextRun(" Understanding how attackers manipulate emotions.")]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun({ text: "AI & Deepfakes:", bold: true }), new TextRun(" Recognizing AI-generated voice clones and manipulated media.")]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun({ text: "Public Wi-Fi Risks:", bold: true }), new TextRun(" The dangers of open networks and the importance of encryption/VPNs.")]
          }),
          new Paragraph({
            spacing: { after: 200 },
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            text: "3. Benefits to the School & Students",
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun({ text: "Zero Cost:", bold: true }), new TextRun(" This workshop is provided entirely free of charge as a community initiative.")]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun({ text: "Interactive Learning:", bold: true }), new TextRun(" Gamified simulations ensure high student engagement and retention.")]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [new TextRun({ text: "Future-Ready Skills:", bold: true }), new TextRun(" Equips students with critical thinking skills for the digital age.")]
          }),
          new Paragraph({
            spacing: { after: 200 },
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            text: "4. Requirements",
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun("The workshop requires a projector/smartboard for the presentation. If available, it can also be conducted in a computer lab where students can interact with the tool directly via their web browsers. No software installation is required.")
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            text: "5. About the Instructor",
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun("This initiative is led by a B.Tech graduate and local Cybersecurity Professional based in Poranki. Passionate about digital literacy, the instructor has developed this platform specifically to make enterprise-grade security awareness accessible to students.")
            ],
          }),

          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            text: "6. Next Steps & Acknowledgment",
            spacing: { before: 200, after: 100 },
          }),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun("A 5-minute live demo of the tool can be arranged at your convenience. If the school finds value in the workshop upon completion, the only request is a brief official letter of acknowledgment on the school's letterhead to support future community initiatives.")
            ],
          }),

          new Paragraph({
            spacing: { before: 400 },
            children: [
              new TextRun({ text: "Contact Information:", bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Name: [Your Name]"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Location: Poranki, Vijayawada"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Phone: [Your Phone Number]"),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun("Email: [Your Email]"),
            ],
          }),
        ],
      },
    ],
  });

  const b64string = await Packer.toBase64String(doc);
  const outputPath = path.join(__dirname, '..', 'Workshop_Proposal.docx');
  fs.writeFileSync(outputPath, Buffer.from(b64string, 'base64'));
  console.log('Document created at ' + outputPath);
}

createProposal().catch(console.error);
