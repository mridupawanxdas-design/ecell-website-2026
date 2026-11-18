export interface RegistrationEmailProps {
  participantName: string;
  eventName: string;
  eventDate: string;
  venue: string;
  registrationId: string;
}

export interface CertificateEmailProps {
  recipientName: string;
  eventName: string;
  eventDate: string;
  certificateType: "Participation" | "Achievement";
  rankOrPosition?: string;
  certificateId: string;
  certificateUrl: string;
  galleryUrl: string;
  futureEventsUrl: string;
}

export interface EncouragementEmailProps {
  recipientName: string;
  eventName: string;
  galleryUrl: string;
  futureEventsUrl: string;
}

export interface MonthlyDigestEmailProps {
  recipientName: string;
  recipientType: "Student" | "Alumni" | "Faculty";
  monthYear: string;
  highlights: string[];
  spotlightStartup: {
    name: string;
    founder: string;
    description: string;
  };
  upcomingEventTitle: string;
  alumniConnectUrl: string;
}

export function generateRegistrationEmailHtml({
  participantName,
  eventName,
  eventDate,
  venue,
  registrationId,
}: RegistrationEmailProps): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #020617; color: #f8fafc; padding: 40px 20px; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background: #0c1324; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
        <div style="background: linear-gradient(135deg, #1d4ed8, #4f46e5); padding: 32px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px; text-transform: uppercase;">E-Cell NIT Silchar</h1>
          <p style="color: #cbd5e1; margin: 8px 0 0; font-size: 14px;">Registration Confirmed</p>
        </div>
        <div style="padding: 32px 24px;">
          <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">Hello ${participantName},</h2>
          <p style="color: #94a3b8; font-size: 15px;">Your registration for <strong style="color: #60a5fa;">${eventName}</strong> has been successfully received.</p>
          
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0 0 10px; color: #e2e8f0; font-size: 14px;"><strong>Registration ID:</strong> <span style="font-family: monospace; color: #38bdf8;">${registrationId}</span></p>
            <p style="margin: 0 0 10px; color: #e2e8f0; font-size: 14px;"><strong>Date & Time:</strong> ${eventDate}</p>
            <p style="margin: 0; color: #e2e8f0; font-size: 14px;"><strong>Venue:</strong> ${venue}</p>
          </div>

          <p style="color: #94a3b8; font-size: 14px;">Please keep your Registration ID handy during check-in. Further schedule updates and track guidelines will be delivered to this email.</p>
          
          <div style="text-align: center; margin-top: 32px;">
            <a href="https://ecellnits.org/events" style="background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; display: inline-block;">View Event Dashboard</a>
          </div>
        </div>
        <div style="background: #080d19; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.05);">
          Entrepreneurship Cell, National Institute of Technology Silchar, Assam 788010
        </div>
      </div>
    </div>
  `;
}

export function generateCertificateEmailHtml({
  recipientName,
  eventName,
  eventDate,
  certificateType,
  rankOrPosition,
  certificateId,
  certificateUrl,
  galleryUrl,
  futureEventsUrl,
}: CertificateEmailProps): string {
  const isWinner = certificateType === "Achievement";
  const titleText = isWinner
    ? `Congratulations on Securing ${rankOrPosition ?? "Podium"} at ${eventName}!`
    : `Thank You for Participating in ${eventName}!`;

  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #020617; color: #f8fafc; padding: 40px 20px; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background: #0c1324; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
        <div style="background: ${isWinner ? "linear-gradient(135deg, #059669, #10b981)" : "linear-gradient(135deg, #1d4ed8, #4f46e5)"}; padding: 32px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px; text-transform: uppercase;">E-Cell NIT Silchar</h1>
          <p style="color: #cbd5e1; margin: 8px 0 0; font-size: 14px;">${isWinner ? "Certificate of Achievement" : "Certificate of Participation"}</p>
        </div>
        <div style="padding: 32px 24px;">
          <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">Dear ${recipientName},</h2>
          <p style="color: #cbd5e1; font-size: 15px;">${titleText}</p>
          <p style="color: #94a3b8; font-size: 14px;">The event took place on <strong>${eventDate}</strong>. We applaud your effort, creative ideation, and entrepreneurial drive throughout the competition.</p>
          
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
            <p style="margin: 0 0 12px; color: #94a3b8; font-size: 13px;">Verified Certificate ID: <strong style="color: #38bdf8; font-family: monospace;">${certificateId}</strong></p>
            <a href="${certificateUrl}" style="background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; display: inline-block;">Download Official Certificate</a>
          </div>

          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; margin-top: 24px;">
            <h4 style="color: #ffffff; font-size: 15px; margin: 0 0 10px;">Relive The Memories & Stay Connected:</h4>
            <ul style="color: #94a3b8; font-size: 13px; padding-left: 20px; margin: 0;">
              <li style="margin-bottom: 8px;">Explore event photos and captured moments at the <a href="${galleryUrl}" style="color: #60a5fa; text-decoration: none;">Official Photo Gallery &rarr;</a></li>
              <li>Discover our next upcoming challenges and summits at <a href="${futureEventsUrl}" style="color: #60a5fa; text-decoration: none;">Upcoming Events &rarr;</a></li>
            </ul>
          </div>
        </div>
        <div style="background: #080d19; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.05);">
          Entrepreneurship Cell, National Institute of Technology Silchar, Assam 788010
        </div>
      </div>
    </div>
  `;
}

export function generateEncouragementEmailHtml({
  recipientName,
  eventName,
  galleryUrl,
  futureEventsUrl,
}: EncouragementEmailProps): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #020617; color: #f8fafc; padding: 40px 20px; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background: #0c1324; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
        <div style="background: linear-gradient(135deg, #312e81, #1e1b4b); padding: 32px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px; text-transform: uppercase;">E-Cell NIT Silchar</h1>
          <p style="color: #a5b4fc; margin: 8px 0 0; font-size: 14px;">A Heartfelt Note of Appreciation</p>
        </div>
        <div style="padding: 32px 24px;">
          <h2 style="color: #ffffff; font-size: 20px; margin-top: 0;">Dear ${recipientName},</h2>
          <p style="color: #cbd5e1; font-size: 15px;">Every great venture is forged through multiple iterations, experiments, and learnings.</p>
          <p style="color: #94a3b8; font-size: 14px;">While your team may not have ended up on the podium for <strong style="color: #e2e8f0;">${eventName}</strong>, the rigor, problem-solving, and dedication you demonstrated set a stellar standard for the campus community.</p>
          
          <div style="background: rgba(59, 130, 246, 0.05); border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; color: #bfdbfe; font-size: 14px; font-style: italic;">
              &ldquo;Success is not final, failure is not fatal: it is the courage to continue that counts.&rdquo;
            </p>
          </div>

          <p style="color: #94a3b8; font-size: 14px;">Our mentors and incubation desks are eager to help you iterate on your pitch, refine your prototype, and prepare for our upcoming challenges.</p>

          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; margin-top: 24px;">
            <h4 style="color: #ffffff; font-size: 15px; margin: 0 0 10px;">What&apos;s Next?</h4>
            <p style="color: #94a3b8; font-size: 13px; margin-bottom: 12px;">Relive the highlights in the <a href="${galleryUrl}" style="color: #60a5fa; text-decoration: none;">Event Gallery</a> and gear up for our next flagship conclave at <a href="${futureEventsUrl}" style="color: #60a5fa; text-decoration: none;">Upcoming Events</a>.</p>
          </div>
        </div>
        <div style="background: #080d19; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.05);">
          Entrepreneurship Cell, National Institute of Technology Silchar, Assam 788010
        </div>
      </div>
    </div>
  `;
}

export function generateMonthlyDigestEmailHtml({
  recipientName,
  recipientType,
  monthYear,
  highlights,
  spotlightStartup,
  upcomingEventTitle,
  alumniConnectUrl,
}: MonthlyDigestEmailProps): string {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #020617; color: #f8fafc; padding: 40px 20px; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background: #0c1324; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
        <div style="background: linear-gradient(135deg, #1e3a8a, #2563eb); padding: 32px 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px; text-transform: uppercase;">E-Cell NIT Silchar</h1>
          <p style="color: #bfdbfe; margin: 8px 0 0; font-size: 14px;">Monthly Ecosystem Digest &mdash; ${monthYear}</p>
        </div>
        <div style="padding: 32px 24px;">
          <h2 style="color: #ffffff; font-size: 18px; margin-top: 0;">Greetings ${recipientName} (${recipientType}),</h2>
          <p style="color: #94a3b8; font-size: 14px;">Here is your monthly roundup of entrepreneurship breakthroughs, student startup ventures, and alumni milestones at NIT Silchar.</p>

          <h3 style="color: #60a5fa; font-size: 16px; margin: 20px 0 10px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 6px;">Key Highlights of the Month</h3>
          <ul style="color: #cbd5e1; font-size: 14px; padding-left: 20px; margin: 0;">
            ${highlights.map((h) => `<li style="margin-bottom: 8px;">${h}</li>`).join("")}
          </ul>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px; margin: 24px 0;">
            <span style="font-size: 11px; text-transform: uppercase; font-weight: bold; color: #34d399; letter-spacing: 1px;">Startup Spotlight</span>
            <h4 style="margin: 6px 0 4px; color: #ffffff; font-size: 16px;">${spotlightStartup.name}</h4>
            <p style="margin: 0 0 6px; color: #94a3b8; font-size: 12px;">Founded by ${spotlightStartup.founder}</p>
            <p style="margin: 0; color: #cbd5e1; font-size: 13px;">${spotlightStartup.description}</p>
          </div>

          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
            <p style="color: #e2e8f0; font-size: 13px; margin: 0 0 12px;">Upcoming Milestone: <strong>${upcomingEventTitle}</strong></p>
            <p style="color: #94a3b8; font-size: 13px; margin: 0;">Are you an E-Cell Alum? Connect with current student founders and offer mentorship at our <a href="${alumniConnectUrl}" style="color: #60a5fa; text-decoration: none;">Alumni Community Portal &rarr;</a></p>
          </div>
        </div>
        <div style="background: #080d19; padding: 20px 24px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.05);">
          Delivered by E-Cell NIT Silchar Ecosystem Dispatcher
        </div>
      </div>
    </div>
  `;
}
