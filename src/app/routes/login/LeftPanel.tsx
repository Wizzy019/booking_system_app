import FloatingBadge from "./FloatingBadge";
import CalendarIllustration from "./CalenderIllustration";

import {
  IconClock,
  IconCalendar,
  IconDots,
  IconUser,
  IconDocument,
  StarDecor,
} from "./Icons";

export default function LeftPanel() {
  return (
    <div
      className="relative hidden lg:flex flex-1 items-center justify-center overflow-hidden"
      style={{ background: "#07101e" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 22% 24%, rgba(24,68,210,0.58) 0%, rgba(28,75,220,0.14) 52%, transparent 72%)",
        }}
      />

      <FloatingBadge icon={<IconClock />} style={{ top: "13%", left: "48%" }} />

      <FloatingBadge
        icon={<IconCalendar />}
        style={{ top: "25%", left: "15%" }}
      />

      <FloatingBadge
        icon={<IconClock />}
        style={{ top: "50%", left: "6.5%" }}
      />

      <FloatingBadge icon={<IconDots />} style={{ top: "66%", left: "15%" }} />

      <FloatingBadge icon={<IconUser />} style={{ top: "27%", right: "17%" }} />

      <FloatingBadge
        icon={<IconDocument />}
        style={{ top: "63%", right: "16%" }}
      />

      <FloatingBadge
        icon={<IconCalendar />}
        style={{ bottom: "12%", left: "46%" }}
      />

      <CalendarIllustration />

      <div className="absolute bottom-5 right-5 opacity-75">
        <StarDecor />
      </div>
    </div>
  );
}
