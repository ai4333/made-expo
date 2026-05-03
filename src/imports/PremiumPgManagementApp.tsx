import svgPaths from "./svg-gayk43wejw";

function Container1() {
  return <div className="absolute bg-[#8a2be2] blur-[64px] h-[894.6px] left-[-9.82px] opacity-40 rounded-[55px] top-[-21.3px] w-[412.65px]" data-name="Container" />;
}

function Container3() {
  return <div className="absolute bg-[#444] h-[31.999px] left-[-3px] rounded-bl-[6px] rounded-tl-[6px] top-[96px] w-[2.997px]" data-name="Container" />;
}

function Container4() {
  return <div className="absolute bg-[#444] h-[47.99px] left-[-3px] rounded-bl-[6px] rounded-tl-[6px] top-[143.99px] w-[2.997px]" data-name="Container" />;
}

function Container5() {
  return <div className="absolute bg-[#444] h-[47.99px] left-[-3px] rounded-bl-[6px] rounded-tl-[6px] top-[207.99px] w-[2.997px]" data-name="Container" />;
}

function Container6() {
  return <div className="absolute bg-[#444] h-[63.999px] left-[392.98px] rounded-br-[6px] rounded-tr-[6px] top-[143.99px] w-[2.997px]" data-name="Container" />;
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[16.009px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#e9d4ff] text-[12px]">Good morning,</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[27.979px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-white top-[-0.83px] whitespace-nowrap">Ramesh 👋</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col h-[43.988px] items-start left-0 top-0 w-[110.673px]" data-name="Container">
      <Paragraph />
      <Heading />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[11px] size-[17.982px] top-[11px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.9825 17.9825">
        <g clipPath="url(#clip0_2100_288)" id="Icon">
          <path d={svgPaths.pe7dc200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49854" />
          <path d={svgPaths.p3883b700} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49854" />
        </g>
        <defs>
          <clipPath id="clip0_2100_288">
            <rect fill="white" height="17.9825" width="17.9825" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute bg-[#dc143c] content-stretch flex items-center justify-center left-[25.99px] rounded-[39244900px] size-[15.99px] top-[-1.99px]" data-name="Text">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[13.5px] not-italic relative shrink-0 text-[9px] text-center text-white whitespace-nowrap">3</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] left-[309.03px] rounded-[39244900px] size-[39.985px] top-[1.99px]" data-name="Button">
      <Icon />
      <Text />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[43.988px] relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Button />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[10px] size-[13.999px] top-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9985 13.9985">
        <g clipPath="url(#clip0_2100_300)" id="Icon">
          <path d={svgPaths.p21d2080} id="Vector" stroke="var(--stroke-0, #32CD32)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16654" />
          <path d={svgPaths.p584f900} id="Vector_2" stroke="var(--stroke-0, #32CD32)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16654" />
        </g>
        <defs>
          <clipPath id="clip0_2100_300">
            <rect fill="white" height="13.9985" width="13.9985" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[19.993px] left-[10px] top-[27.98px] w-[88.341px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[14px] text-white top-[0.17px] whitespace-nowrap">₹42,500</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[13.487px] left-[10px] top-[49.96px] w-[88.341px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[#e9d4ff] text-[9px] top-[0.17px] whitespace-nowrap">Total Income</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] flex-[1_0_0] h-[73.447px] min-h-px min-w-px relative rounded-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon1 />
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[10px] size-[13.999px] top-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9985 13.9985">
        <g clipPath="url(#clip0_2100_276)" id="Icon">
          <path d={svgPaths.p1bc30780} id="Vector" stroke="var(--stroke-0, #FFA500)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16654" />
          <path d={svgPaths.p13e45380} id="Vector_2" stroke="var(--stroke-0, #FFA500)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16654" />
          <path d={svgPaths.p37e9c240} id="Vector_3" stroke="var(--stroke-0, #FFA500)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16654" />
          <path d={svgPaths.p189ede80} id="Vector_4" stroke="var(--stroke-0, #FFA500)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16654" />
        </g>
        <defs>
          <clipPath id="clip0_2100_276">
            <rect fill="white" height="13.9985" width="13.9985" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[19.993px] left-[10px] top-[27.98px] w-[88.359px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[14px] text-white top-[0.17px] whitespace-nowrap">87%</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[13.487px] left-[10px] top-[49.96px] w-[88.359px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[#e9d4ff] text-[9px] top-[0.17px] whitespace-nowrap">Occupancy</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] flex-[1_0_0] h-[73.447px] min-h-px min-w-px relative rounded-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon2 />
        <Paragraph3 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[10px] size-[13.999px] top-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9985 13.9985">
        <g clipPath="url(#clip0_2100_263)" id="Icon">
          <path d={svgPaths.p31b531c0} id="Vector" stroke="var(--stroke-0, #DC143C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16654" />
          <path d="M6.99927 4.66618V6.99927" id="Vector_2" stroke="var(--stroke-0, #DC143C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16654" />
          <path d="M6.99927 9.33236H7.0051" id="Vector_3" stroke="var(--stroke-0, #DC143C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16654" />
        </g>
        <defs>
          <clipPath id="clip0_2100_263">
            <rect fill="white" height="13.9985" width="13.9985" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[19.993px] left-[10px] top-[27.98px] w-[88.359px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[14px] text-white top-[0.17px] whitespace-nowrap">₹17,000</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[13.487px] left-[10px] top-[49.96px] w-[88.359px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[#e9d4ff] text-[9px] top-[0.17px] whitespace-nowrap">Overdue</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[rgba(255,255,255,0.15)] flex-[1_0_0] h-[73.447px] min-h-px min-w-px relative rounded-[14px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon3 />
        <Paragraph5 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[73.447px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[11.988px] items-start relative size-full">
        <Container12 />
        <Container13 />
        <Container14 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15.99px] h-[209.412px] items-start left-0 pt-[55.994px] px-[19.993px] rounded-bl-[28px] rounded-br-[28px] top-0 w-[388.999px]" data-name="Container" style={{ backgroundImage: "linear-gradient(168.914deg, rgb(106, 13, 173) 8.4861%, rgb(138, 43, 226) 91.514%)" }}>
      <Container9 />
      <Container11 />
    </div>
  );
}

function Zi1() {
  return (
    <div className="h-[16.502px] relative shrink-0 w-full" data-name="ZI">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[0.17px] tracking-[0.55px] uppercase whitespace-nowrap">Quick Actions</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[27.997px] relative shrink-0 w-[24.726px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[12px] not-italic text-[#0a0a0a] text-[18px] text-center top-[-0.66px] whitespace-nowrap">💵</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[rgba(50,205,50,0.13)] relative rounded-[14px] shrink-0 size-[35.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[5.629px] relative size-full">
        <Text1 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[11.239px] relative shrink-0 w-[49.415px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[11.25px] not-italic relative shrink-0 text-[#2c1810] text-[9px] text-center whitespace-nowrap">+Cash Paid</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col gap-[5.994px] h-[79.532px] items-center left-0 pb-[1.17px] pt-[13.158px] px-[1.17px] rounded-[16px] top-0 w-[75.658px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.17px] border-[rgba(138,43,226,0.12)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_12px_0px_rgba(138,43,226,0.06)]" />
      <Container17 />
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[27.997px] relative shrink-0 w-[24.726px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[12px] not-italic text-[#0a0a0a] text-[18px] text-center top-[-0.66px] whitespace-nowrap">📢</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[rgba(138,43,226,0.13)] relative rounded-[14px] shrink-0 size-[35.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[5.629px] relative size-full">
        <Text3 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[11.239px] relative shrink-0 w-[44.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[11.25px] not-italic relative shrink-0 text-[#2c1810] text-[9px] text-center whitespace-nowrap">Announce</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col gap-[5.994px] h-[79.532px] items-center left-[83.64px] pb-[1.17px] pt-[13.158px] px-[1.17px] rounded-[16px] top-0 w-[75.658px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.17px] border-[rgba(138,43,226,0.12)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_12px_0px_rgba(138,43,226,0.06)]" />
      <Container18 />
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[27.997px] relative shrink-0 w-[24.726px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[12px] not-italic text-[#0a0a0a] text-[18px] text-center top-[-0.66px] whitespace-nowrap">💰</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[rgba(255,165,0,0.13)] relative rounded-[14px] shrink-0 size-[35.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[5.629px] relative size-full">
        <Text5 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[11.239px] relative shrink-0 w-[43.311px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[11.25px] not-italic relative shrink-0 text-[#2c1810] text-[9px] text-center whitespace-nowrap">+Expense</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col gap-[5.994px] h-[79.532px] items-center left-[167.29px] pb-[1.17px] pt-[13.158px] px-[1.17px] rounded-[16px] top-0 w-[75.658px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.17px] border-[rgba(138,43,226,0.12)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_12px_0px_rgba(138,43,226,0.06)]" />
      <Container19 />
      <Text6 />
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[27.997px] relative shrink-0 w-[24.726px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[28px] left-[12px] not-italic text-[#0a0a0a] text-[18px] text-center top-[-0.66px] whitespace-nowrap">⏰</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[rgba(147,112,219,0.13)] relative rounded-[14px] shrink-0 size-[35.983px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[5.629px] relative size-full">
        <Text7 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[11.239px] relative shrink-0 w-[46.473px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[11.25px] not-italic relative shrink-0 text-[#2c1810] text-[9px] text-center whitespace-nowrap">Reminders</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.7)] content-stretch flex flex-col gap-[5.994px] h-[79.532px] items-center left-[250.93px] pb-[1.17px] pt-[13.158px] px-[1.17px] rounded-[16px] top-0 w-[75.676px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[1.17px] border-[rgba(138,43,226,0.12)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_12px_0px_rgba(138,43,226,0.06)]" />
      <Container20 />
      <Text8 />
    </div>
  );
}

function Zi2() {
  return (
    <div className="h-[79.532px] relative shrink-0 w-full" data-name="ZI">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[7.986px] h-[104.02px] items-start relative shrink-0 w-full" data-name="Container">
      <Zi1 />
      <Zi2 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[16.502px] relative shrink-0 w-[46.546px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[0.17px] tracking-[0.55px] uppercase whitespace-nowrap">My PGs</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[40.99px] size-[9.996px] top-[2.49px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.99634 9.99634">
        <g id="Icon">
          <path d={svgPaths.p319ddb00} id="Vector" stroke="var(--stroke-0, #8A2BE2)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833029" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[14.985px] relative shrink-0 w-[50.987px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[15px] left-[19.5px] not-italic text-[#8a2be2] text-[10px] text-center top-[0.17px] whitespace-nowrap">{`Manage `}</p>
        <Icon4 />
      </div>
    </div>
  );
}

function Zi3() {
  return (
    <div className="h-[16.502px] relative shrink-0 w-full" data-name="ZI">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Paragraph7 />
          <Button5 />
        </div>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[27.979px] relative shrink-0 w-[27.467px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[#0a0a0a] text-[20px] top-[-0.83px] whitespace-nowrap">🏢</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-[rgba(138,43,226,0.08)] relative rounded-[14px] shrink-0 size-[39.985px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.25px] pr-[6.268px] relative size-full">
        <Text9 />
      </div>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[19.993px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#2c1810] text-[14px] top-[0.17px] whitespace-nowrap">Sharma Boys PG</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[14.985px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#99a1af] text-[10px] top-[0.17px] whitespace-nowrap">Koramangala, Bengaluru</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[36.97px] relative shrink-0 w-[115.515px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.992px] items-start relative size-full">
        <Paragraph8 />
        <Paragraph9 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[39.985px] relative shrink-0 w-[167.489px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.988px] items-center relative size-full">
        <Container23 />
        <Container24 />
      </div>
    </div>
  );
}

function Container28() {
  return <div className="bg-[#8a2be2] rounded-[39244900px] shrink-0 size-[7.986px]" data-name="Container" />;
}

function Container29() {
  return <div className="bg-[#8a2be2] rounded-[39244900px] shrink-0 size-[7.986px]" data-name="Container" />;
}

function Container30() {
  return <div className="bg-[#8a2be2] rounded-[39244900px] shrink-0 size-[7.986px]" data-name="Container" />;
}

function Container31() {
  return <div className="bg-[#8a2be2] rounded-[39244900px] shrink-0 size-[7.986px]" data-name="Container" />;
}

function Container32() {
  return <div className="bg-[#8a2be2] rounded-[39244900px] shrink-0 size-[7.986px]" data-name="Container" />;
}

function Container33() {
  return <div className="bg-[#8a2be2] rounded-[39244900px] shrink-0 size-[7.986px]" data-name="Container" />;
}

function Container34() {
  return <div className="bg-[#8a2be2] rounded-[39244900px] shrink-0 size-[7.986px]" data-name="Container" />;
}

function Container35() {
  return <div className="bg-[#e5e7eb] rounded-[39244900px] shrink-0 size-[7.986px]" data-name="Container" />;
}

function Container27() {
  return (
    <div className="h-[7.986px] relative shrink-0 w-[91.776px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.984px] items-start relative size-full">
        <Container28 />
        <Container29 />
        <Container30 />
        <Container31 />
        <Container32 />
        <Container33 />
        <Container34 />
        <Container35 />
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[13.487px] relative shrink-0 w-[55.884px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[#99a1af] text-[9px] top-[0.17px] whitespace-nowrap">7/8 occupied</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[25.457px] relative shrink-0 w-[91.776px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.984px] items-end relative size-full">
        <Container27 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[13.999px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9985 13.9985">
        <g id="Icon">
          <path d={svgPaths.p87a8280} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16654" />
        </g>
      </svg>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[25.457px] relative shrink-0 w-[113.761px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center relative size-full">
        <Container26 />
        <Icon5 />
      </div>
    </div>
  );
}

function Zi5() {
  return (
    <div className="content-stretch flex h-[39.985px] items-center justify-between relative shrink-0 w-full" data-name="ZI">
      <Container22 />
      <Container25 />
    </div>
  );
}

function Y() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[74.306px] relative rounded-[16px] shrink-0 w-full" data-name="Y">
      <div aria-hidden="true" className="absolute border-[1.17px] border-[rgba(138,43,226,0.15)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_24px_0px_rgba(138,43,226,0.08)]" />
      <div className="content-stretch flex flex-col items-start pb-[1.17px] pt-[17.16px] px-[17.16px] relative size-full">
        <Zi5 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[27.979px] relative shrink-0 w-[27.467px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[28px] left-0 not-italic text-[#0a0a0a] text-[20px] top-[-0.83px] whitespace-nowrap">🏢</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="bg-[rgba(147,112,219,0.08)] relative rounded-[14px] shrink-0 size-[39.985px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.25px] pr-[6.268px] relative size-full">
        <Text10 />
      </div>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[19.993px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[#2c1810] text-[14px] top-[0.17px] whitespace-nowrap">Sharma Girls PG</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[14.985px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#99a1af] text-[10px] top-[0.17px] whitespace-nowrap">HSR Layout, Bengaluru</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[36.97px] relative shrink-0 w-[109.923px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.992px] items-start relative size-full">
        <Paragraph11 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[39.985px] relative shrink-0 w-[161.897px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[11.988px] items-center relative size-full">
        <Container37 />
        <Container38 />
      </div>
    </div>
  );
}

function Container42() {
  return <div className="bg-[#9370db] rounded-[39244900px] shrink-0 size-[7.986px]" data-name="Container" />;
}

function Container43() {
  return <div className="bg-[#9370db] rounded-[39244900px] shrink-0 size-[7.986px]" data-name="Container" />;
}

function Container44() {
  return <div className="bg-[#9370db] rounded-[39244900px] shrink-0 size-[7.986px]" data-name="Container" />;
}

function Container45() {
  return <div className="bg-[#9370db] rounded-[39244900px] shrink-0 size-[7.986px]" data-name="Container" />;
}

function Container46() {
  return <div className="bg-[#9370db] rounded-[39244900px] shrink-0 size-[7.986px]" data-name="Container" />;
}

function Container47() {
  return <div className="bg-[#e5e7eb] rounded-[39244900px] shrink-0 size-[7.986px]" data-name="Container" />;
}

function Container41() {
  return (
    <div className="h-[7.986px] relative shrink-0 w-[67.836px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.984px] items-start relative size-full">
        <Container42 />
        <Container43 />
        <Container44 />
        <Container45 />
        <Container46 />
        <Container47 />
      </div>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[13.487px] relative shrink-0 w-[56.14px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[#99a1af] text-[9px] top-[0.17px] whitespace-nowrap">5/6 occupied</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[25.457px] relative shrink-0 w-[67.836px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.984px] items-end relative size-full">
        <Container41 />
        <Paragraph13 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[13.999px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9985 13.9985">
        <g id="Icon">
          <path d={svgPaths.p87a8280} id="Vector" stroke="var(--stroke-0, #D1D5DC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16654" />
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[25.457px] relative shrink-0 w-[89.821px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.986px] items-center relative size-full">
        <Container40 />
        <Icon6 />
      </div>
    </div>
  );
}

function Zi6() {
  return (
    <div className="h-[39.985px] relative shrink-0 w-full" data-name="ZI">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between relative size-full">
          <Container36 />
          <Container39 />
        </div>
      </div>
    </div>
  );
}

function Y1() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[74.306px] relative rounded-[16px] shrink-0 w-full" data-name="Y">
      <div aria-hidden="true" className="absolute border-[1.17px] border-[rgba(138,43,226,0.15)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_24px_0px_rgba(138,43,226,0.08)]" />
      <div className="content-stretch flex flex-col items-start pb-[1.17px] pt-[17.16px] px-[17.16px] relative size-full">
        <Zi6 />
      </div>
    </div>
  );
}

function Zi4() {
  return (
    <div className="content-stretch flex flex-col gap-[7.986px] h-[156.597px] items-start relative shrink-0 w-full" data-name="ZI">
      <Y />
      <Y1 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[7.986px] h-[181.086px] items-start relative shrink-0 w-full" data-name="Container">
      <Zi3 />
      <Zi4 />
    </div>
  );
}

function Zi7() {
  return (
    <div className="h-[16.502px] relative shrink-0 w-full" data-name="ZI">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#6a7282] text-[11px] top-[0.17px] tracking-[0.55px] uppercase whitespace-nowrap">Recent Activity</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[19.993px] relative shrink-0 w-[19.225px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[0.17px] whitespace-nowrap">💵</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="bg-[rgba(50,205,50,0.08)] relative rounded-[14px] shrink-0 size-[31.999px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.378px] pr-[6.396px] relative size-full">
        <Text11 />
      </div>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[18.001px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-0 not-italic text-[#2c1810] text-[12px] top-[0.17px] whitespace-nowrap">Cash received from Arjun Kumar</p>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[14.985px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#99a1af] text-[10px] top-[0.17px] whitespace-nowrap">Room 101A • ₹8,500</p>
    </div>
  );
}

function Container51() {
  return (
    <div className="flex-[1_0_0] h-[32.986px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph14 />
        <Paragraph15 />
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[13.487px] relative shrink-0 w-[29.295px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[#d1d5dc] text-[9px] top-[0.17px] whitespace-nowrap">2h ago</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex gap-[11.988px] h-[32.986px] items-center relative shrink-0 w-full" data-name="Container">
      <Container50 />
      <Container51 />
      <Text12 />
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[19.993px] relative shrink-0 w-[19.225px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[0.17px] whitespace-nowrap">⚠️</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="bg-[rgba(220,20,60,0.08)] relative rounded-[14px] shrink-0 size-[31.999px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.378px] pr-[6.396px] relative size-full">
        <Text13 />
      </div>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="absolute h-[18.001px] left-0 overflow-clip top-0 w-[208.644px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-0 not-italic text-[#2c1810] text-[12px] top-[0.17px] whitespace-nowrap">Rent overdue - Suresh Patel</p>
    </div>
  );
}

function Paragraph17() {
  return (
    <div className="absolute h-[14.985px] left-0 top-[18px] w-[208.644px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#99a1af] text-[10px] top-[0.17px] whitespace-nowrap">Room 101C • ₹17,000</p>
    </div>
  );
}

function Container54() {
  return (
    <div className="flex-[1_0_0] h-[32.986px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph16 />
        <Paragraph17 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[13.487px] relative shrink-0 w-[27.668px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[#d1d5dc] text-[9px] top-[0.17px] whitespace-nowrap">1d ago</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex gap-[11.988px] h-[32.986px] items-center relative shrink-0 w-full" data-name="Container">
      <Container53 />
      <Container54 />
      <Text14 />
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[19.993px] relative shrink-0 w-[19.225px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#0a0a0a] text-[14px] top-[0.17px] whitespace-nowrap">🔧</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="bg-[rgba(255,165,0,0.08)] relative rounded-[14px] shrink-0 size-[31.999px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[6.378px] pr-[6.396px] relative size-full">
        <Text15 />
      </div>
    </div>
  );
}

function Paragraph18() {
  return (
    <div className="h-[18.001px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-0 not-italic text-[#2c1810] text-[12px] top-[0.17px] whitespace-nowrap">New complaint: Tap leaking</p>
    </div>
  );
}

function Paragraph19() {
  return (
    <div className="h-[14.985px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#99a1af] text-[10px] top-[0.17px] whitespace-nowrap">Room 102B • Urgent</p>
    </div>
  );
}

function Container57() {
  return (
    <div className="flex-[1_0_0] h-[32.986px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph18 />
        <Paragraph19 />
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[13.487px] relative shrink-0 w-[29.368px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[#d1d5dc] text-[9px] top-[0.17px] whitespace-nowrap">3h ago</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[32.986px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.988px] items-center relative size-full">
          <Container56 />
          <Container57 />
          <Text16 />
        </div>
      </div>
    </div>
  );
}

function Zi8() {
  return (
    <div className="content-stretch flex flex-col gap-[11.988px] h-[122.935px] items-start relative shrink-0 w-full" data-name="ZI">
      <Container49 />
      <Container52 />
      <Container55 />
    </div>
  );
}

function Y2() {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] h-[157.255px] relative rounded-[16px] shrink-0 w-full" data-name="Y">
      <div aria-hidden="true" className="absolute border-[1.17px] border-[rgba(138,43,226,0.15)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_4px_24px_0px_rgba(138,43,226,0.08)]" />
      <div className="content-stretch flex flex-col items-start pb-[1.17px] pt-[17.16px] px-[17.16px] relative size-full">
        <Zi8 />
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex flex-col gap-[7.986px] h-[181.743px] items-start relative shrink-0 w-full" data-name="Container">
      <Zi7 />
      <Y2 />
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[31.981px] relative shrink-0 w-[32.968px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[32px] left-0 not-italic text-[#0a0a0a] text-[24px] top-[-0.83px] whitespace-nowrap">⚡</p>
      </div>
    </div>
  );
}

function Paragraph20() {
  return (
    <div className="h-[18.001px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-0 not-italic text-[#b01030] text-[12px] top-[0.17px] whitespace-nowrap">1 Overdue Tenant</p>
    </div>
  );
}

function Paragraph21() {
  return (
    <div className="h-[14.985px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[#6a7282] text-[10px] top-[0.17px] whitespace-nowrap">Suresh Patel • Room 101C • ₹17,000</p>
    </div>
  );
}

function Container59() {
  return (
    <div className="flex-[1_0_0] h-[32.986px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph20 />
        <Paragraph21 />
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#dc143c] h-[28.49px] relative rounded-[10px] shrink-0 w-[50.914px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[16.5px] left-[24.99px] not-italic text-[11px] text-center text-white top-[6.16px] whitespace-nowrap">View</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[67.306px] relative rounded-[16px] shrink-0 w-full" data-name="Container" style={{ backgroundImage: "linear-gradient(168.356deg, rgba(220, 20, 60, 0.1) 0%, rgba(255, 165, 0, 0.08) 100%)" }}>
      <div aria-hidden="true" className="absolute border-[1.17px] border-[rgba(220,20,60,0.2)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.988px] items-center px-[17.161px] py-[1.17px] relative size-full">
          <Text17 />
          <Container59 />
          <Button6 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[15.99px] h-[638.596px] items-start left-0 overflow-clip pl-[15.991px] pr-[46.4px] pt-[15.991px] top-[209.41px] w-[388.999px]" data-name="Container">
      <Container16 />
      <Container21 />
      <Container48 />
      <Container58 />
    </div>
  );
}

function Zi() {
  return (
    <div className="absolute bg-gradient-to-b from-[#f8f1ff] h-[848.008px] left-0 to-[#ede0ff] top-0 w-[388.999px]" data-name="ZI">
      <Container8 />
      <Container15 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[19.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-[37.5%] right-[37.5%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-11.11%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66423 9.16332">
            <path d={svgPaths.p6d4500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.34%_12.5%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.26%_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6606 17.4932">
            <path d={svgPaths.p2cfb8e80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="bg-[#8a2be2] relative rounded-[14px] shrink-0 size-[31.981px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[5.994px] px-[5.994px] relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[14.985px] relative shrink-0 w-[28.253px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[14.5px] not-italic text-[#8a2be2] text-[10px] text-center top-[0.17px] whitespace-nowrap">Home</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[56.926px] relative shrink-0 w-[55.958px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.992px] items-center pt-[3.984px] relative size-full">
        <Container60 />
        <Text18 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[19.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[8.33%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6624 18.3266">
            <path d={svgPaths.p39e57200} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-[8.33%] right-3/4 top-1/2" data-name="Vector">
        <div className="absolute inset-[-10%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.99817 9.99634">
            <path d={svgPaths.p17718c80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-3/4 right-[8.33%] top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-7.69%_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.99817 12.4954">
            <path d={svgPaths.p27d45600} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[41.67%] right-[41.67%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.99817 1.66606">
            <path d="M0.833029 0.833029H4.16514" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[41.67%_41.67%_58.33%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.99817 1.66606">
            <path d="M0.833029 0.833029H4.16514" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_41.67%_41.67%_41.67%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.99817 1.66606">
            <path d="M0.833029 0.833029H4.16514" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[41.67%] right-[41.67%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.99817 1.66606">
            <path d="M0.833029 0.833029H4.16514" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[31.981px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[5.994px] px-[5.994px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[14.985px] relative shrink-0 w-[19.28px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[10px] not-italic text-[#99a1af] text-[10px] text-center top-[0.17px] whitespace-nowrap">PGs</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[56.926px] relative shrink-0 w-[55.958px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.992px] items-center pt-[3.984px] relative size-full">
        <Container61 />
        <Text19 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[19.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[87.5%] left-1/4 right-1/4 top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6624 1.66606">
            <path d="M0.833029 0.833029H10.8294" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[66.67%] left-1/4 right-1/4 top-[33.33%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6624 1.66606">
            <path d="M0.833029 0.833029H10.8294" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[12.5%] left-1/4 right-[39.58%] top-[54.17%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-11.76%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.74681 8.33029">
            <path d={svgPaths.p1f18f500} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[45.83%] left-1/4 right-[62.5%] top-[54.17%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-33.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.16514 1.66606">
            <path d="M0.833029 0.833029H3.33211" id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_41.67%_45.83%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-10%_-20%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.83141 9.99634">
            <path d={svgPaths.p19b4dc80} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[31.981px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[5.994px] px-[5.994px] relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[14.985px] relative shrink-0 w-[21.637px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[11px] not-italic text-[#99a1af] text-[10px] text-center top-[0.17px] whitespace-nowrap">Rent</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[56.926px] relative shrink-0 w-[55.958px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.992px] items-center pt-[3.984px] relative size-full">
        <Container62 />
        <Text20 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[19.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.32%_8.32%_12.49%_12.49%]" data-name="Vector">
        <div className="absolute inset-[-5.26%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.4977 17.4977">
            <path d={svgPaths.p1e29a000} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container63() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[31.981px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[5.994px] px-[5.994px] relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[14.985px] relative shrink-0 w-[41.667px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[21px] not-italic text-[#99a1af] text-[10px] text-center top-[0.17px] whitespace-nowrap">Services</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[56.926px] relative shrink-0 w-[65.643px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.992px] items-center pt-[3.984px] relative size-full">
        <Container63 />
        <Text21 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[19.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[62.5%_20.83%_12.5%_20.83%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3285 6.66423">
            <path d={svgPaths.p339b1380} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_33.33%_54.17%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33029 8.33029">
            <path d={svgPaths.p38549300} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66606" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="relative rounded-[14px] shrink-0 size-[31.981px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[5.994px] px-[5.994px] relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[14.985px] relative shrink-0 w-[30.866px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[15px] left-[15.5px] not-italic text-[#99a1af] text-[10px] text-center top-[0.17px] whitespace-nowrap">Profile</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[56.926px] relative shrink-0 w-[55.958px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[1.992px] items-center pt-[3.984px] relative size-full">
        <Container64 />
        <Text22 />
      </div>
    </div>
  );
}

function QX() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.85)] content-stretch flex h-[75.238px] items-center justify-between left-[11.99px] pl-[8.48px] pr-[8.498px] py-[1.17px] rounded-[16px] top-[744.79px] w-[365.022px]" data-name="qX">
      <div aria-hidden="true" className="absolute border-[1.17px] border-[rgba(233,212,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_-2px_20px_0px_rgba(138,43,226,0.1)]" />
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
    </div>
  );
}

function Vx() {
  return (
    <div className="absolute h-[848.008px] left-0 overflow-clip top-0 w-[388.999px]" data-name="VX">
      <Zi />
      <QX />
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[16.502px] relative shrink-0 w-[22.167px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#2c1810] text-[11px] top-[0.17px] whitespace-nowrap">9:41</p>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[11.988px] relative shrink-0 w-[15.99px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9905 11.9883">
        <g clipPath="url(#clip0_2100_270)" id="Icon">
          <path d={svgPaths.p375ee100} fill="var(--fill-0, #2C1810)" id="Vector" />
          <path d={svgPaths.p1a496d80} fill="var(--fill-0, #2C1810)" id="Vector_2" />
          <path d={svgPaths.p16e84e00} fill="var(--fill-0, #2C1810)" id="Vector_3" />
          <path d={svgPaths.p1f980a80} fill="var(--fill-0, #2C1810)" id="Vector_4" opacity="0.3" />
        </g>
        <defs>
          <clipPath id="clip0_2100_270">
            <rect fill="white" height="11.9883" width="15.9905" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[11.988px] relative shrink-0 w-[14.985px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.9854 11.9883">
        <g clipPath="url(#clip0_2100_258)" id="Icon">
          <path d={svgPaths.p2e888c00} fill="var(--fill-0, #2C1810)" id="Vector" />
          <path d={svgPaths.p14abf480} fill="var(--fill-0, #2C1810)" id="Vector_2" />
          <path d={svgPaths.p12c5a800} fill="var(--fill-0, #2C1810)" id="Vector_3" />
        </g>
        <defs>
          <clipPath id="clip0_2100_258">
            <rect fill="white" height="11.9883" width="14.9854" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container69() {
  return <div className="bg-[#2c1810] h-[5.994px] rounded-[6px] shrink-0 w-[15.99px]" data-name="Container" />;
}

function Container68() {
  return (
    <div className="flex-[1_0_0] h-[11.988px] min-h-px min-w-px relative rounded-[6px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#2c1810] border-[1.17px] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center pl-[3.162px] pr-[1.17px] py-[1.17px] relative size-full">
          <Container69 />
        </div>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="h-[11.988px] relative shrink-0 w-[23.995px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Container68 />
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="h-[11.988px] relative shrink-0 w-[62.939px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[3.984px] items-center relative size-full">
        <Icon12 />
        <Icon13 />
        <Container67 />
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute content-stretch flex h-[55.994px] items-center justify-between left-0 px-[31.999px] top-0 w-[388.999px]" data-name="Container">
      <Text23 />
      <Container66 />
    </div>
  );
}

function Container71() {
  return (
    <div className="bg-[#1a1a1a] relative rounded-[39244900px] shrink-0 size-[7.986px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333] border-[1.17px] border-solid inset-0 pointer-events-none rounded-[39244900px]" />
    </div>
  );
}

function Container72() {
  return (
    <div className="bg-[#1a1a1a] relative rounded-[39244900px] shrink-0 size-[11.988px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#333] border-[1.17px] border-solid inset-0 pointer-events-none rounded-[39244900px]" />
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute bg-black content-stretch flex gap-[7.986px] h-[33.991px] items-center justify-center left-[134.5px] px-[46.016px] rounded-[39244900px] top-[11.99px] w-[119.993px]" data-name="Container">
      <Container71 />
      <Container72 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-[#f8f1ff] h-[848.008px] left-[1.99px] overflow-clip rounded-[53px] top-[1.99px] w-[388.999px]" data-name="Container">
      <Vx />
      <Container65 />
      <Container70 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-black h-[851.992px] left-0 rounded-[55px] shadow-[0px_0px_0px_0px_#333,0px_0px_0px_0px_#111,0px_30px_80px_0px_rgba(0,0,0,0.9)] top-0 w-[392.982px]" data-name="Container">
      <Container3 />
      <Container4 />
      <Container5 />
      <Container6 />
      <Container7 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_0px_0px_#444]" />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[851.992px] left-[733.92px] top-[125.46px] w-[392.982px]" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

export default function PremiumPgManagementApp() {
  return (
    <div className="relative size-full" data-name="Premium PG Management App" style={{ backgroundImage: "linear-gradient(149.354deg, rgb(15, 23, 43) 0%, rgb(60, 3, 102) 50%, rgb(15, 23, 43) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <Container />
    </div>
  );
}