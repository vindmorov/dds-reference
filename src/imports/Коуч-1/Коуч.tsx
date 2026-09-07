import svgPaths from "./svg-90mq4uedav";

function Logo1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Logo">
      <div className="h-[34px] relative shrink-0 w-[73px]" data-name="tochka_bank_cyr_two_lines">
        <div className="-translate-y-1/2 absolute aspect-[679/315.07196044921875] left-[0.14%] right-[0.01%] top-[calc(50%+0.32px)]" data-name="tochka_bank_cyr_two_lines">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 72.8926 33.8239">
            <g id="tochka_bank_cyr_two_lines">
              <path d={svgPaths.p7d82300} fill="var(--fill-0, #191919)" />
              <path d={svgPaths.pd759700} fill="var(--fill-0, #191919)" />
              <path d={svgPaths.p3bcc9210} fill="var(--fill-0, #191919)" />
              <path d={svgPaths.p16e03600} fill="var(--fill-0, #191919)" />
              <path d={svgPaths.p5d42380} fill="var(--fill-0, #191919)" />
              <path d={svgPaths.p33d1a770} fill="var(--fill-0, #191919)" />
              <path d={svgPaths.p3f035600} fill="var(--fill-0, #191919)" />
              <path d={svgPaths.p146e7600} fill="var(--fill-0, #191919)" />
              <path d={svgPaths.p29b761f0} fill="var(--fill-0, #191919)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="content-stretch flex gap-[12px] items-center px-[20px] relative shrink-0" data-name="Logo">
      <Logo1 />
    </div>
  );
}

function Content1() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-w-px relative" data-name="Content">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[20px] relative size-full">
          <div className="content-stretch flex gap-[10px] items-center px-[15px] py-[10px] relative rounded-[10px] shrink-0" data-name="SCI Navigation Button">
            <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#191919] text-[16px] tracking-[0.16px] whitespace-nowrap">Главная</p>
          </div>
          <div className="content-stretch flex gap-[10px] items-center px-[15px] py-[10px] relative rounded-[10px] shrink-0" data-name="SCI Navigation Button">
            <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#191919] text-[16px] tracking-[0.16px] whitespace-nowrap">Платежи</p>
          </div>
          <div className="content-stretch flex gap-[10px] items-center px-[15px] py-[10px] relative rounded-[10px] shrink-0" data-name="SCI Navigation Button">
            <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#191919] text-[16px] tracking-[0.16px] whitespace-nowrap">Сервисы</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Name() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Name">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#191919] text-[16px] text-right tracking-[0.16px] whitespace-nowrap">Носковец О.Н., ИП</p>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start relative shrink-0" data-name="Content">
      <Name />
    </div>
  );
}

function Left() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Left">
      <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Avatar">
        <div className="relative shrink-0 size-[34px]" data-name="Fill">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
            <path d={svgPaths.p369acb80} fill="var(--fill-0, #95AEE2)" id="Fill" />
          </svg>
        </div>
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['TT_Norms_Tochka_Extended:Medium',sans-serif] justify-center leading-[0] left-1/2 not-italic size-[34px] text-[12px] text-center text-white top-1/2 tracking-[0.12px]">
          <p className="leading-[15px]">НО</p>
        </div>
      </div>
      <Content2 />
    </div>
  );
}

function Notifications() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Notifications">
      <div className="absolute right-0 size-[24px] top-0" data-name="Stroked 2px/Bell">
        <div className="absolute inset-[4.17%_12.5%]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 22">
            <path d={svgPaths.pf24f7b4} fill="var(--fill-0, #191919)" id="Icon" />
          </svg>
        </div>
      </div>
      <div className="absolute left-[20px] overflow-clip size-[8px] top-[-4px]" data-name="🛠 Notification Indicator">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#d84d4d] left-1/2 rounded-[96px] size-[8px] top-1/2" data-name="Fill" />
      </div>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0" data-name="Actions">
      <Notifications />
      <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Gift">
        <div className="absolute inset-[4.17%]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
            <path d={svgPaths.p2fb8ac80} fill="var(--fill-0, #191919)" id="Icon" />
          </svg>
        </div>
      </div>
      <div className="relative shrink-0 size-[24px]" data-name="Common/Stroked/Gear">
        <div className="absolute inset-[5.58%_4.17%]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 21.3203">
            <path d={svgPaths.p34dc3500} fill="var(--fill-0, #191919)" id="Icon" />
          </svg>
        </div>
      </div>
      <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Arrow Right Outgoing Rectangle Vertical">
        <div className="absolute inset-[8.33%]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9999 20">
            <path d={svgPaths.p32d79c80} fill="var(--fill-0, #191919)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function CutomerSettings() {
  return (
    <div className="content-stretch flex gap-[20px] items-center justify-end px-[20px] relative shrink-0" data-name="Cutomer & Settings">
      <Left />
      <Actions />
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-w-px relative" data-name="Content">
      <Logo />
      <Content1 />
      <CutomerSettings />
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center relative shrink-0" data-name="Content">
      <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Plus Circle">
        <div className="absolute inset-[8.33%]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p13244f00} fill="var(--fill-0, white)" id="Icon" />
          </svg>
        </div>
      </div>
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[0.14px] whitespace-nowrap">Создать</p>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center relative shrink-0" data-name="Content">
      <div className="relative shrink-0 size-[24px]" data-name="Icon">
        <div className="absolute inset-[8.33%]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p11d81cf0} fill="var(--fill-0, white)" id="Icon" />
          </svg>
        </div>
      </div>
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[0.14px] whitespace-nowrap">{`Загрузить `}</p>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center relative shrink-0" data-name="Content">
      <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Gear">
        <div className="absolute inset-[5.58%_4.17%]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 21.3203">
            <path d={svgPaths.p34dc3500} fill="var(--fill-0, #835DE1)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Block() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0" data-name="Block">
      <div className="bg-[#835de1] content-stretch flex h-[40px] items-center px-[12px] relative rounded-[10px] shrink-0" data-name="Header Button">
        <Content4 />
      </div>
      <div className="bg-[#835de1] content-stretch flex h-[40px] items-center px-[12px] relative rounded-[10px] shrink-0" data-name="Header Button">
        <Content5 />
      </div>
      <div className="bg-[rgba(25,25,25,0.05)] content-stretch flex h-[40px] items-center px-[12px] relative rounded-[10px] shrink-0" data-name="Header Button">
        <Content6 />
      </div>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center relative shrink-0" data-name="Content">
      <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Requisites T">
        <div className="absolute inset-[4.17%_12.5%_8.33%_12.5%]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 21">
            <path d={svgPaths.p3594ade0} fill="var(--fill-0, #835DE1)" id="Icon" />
          </svg>
        </div>
      </div>
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#835de1] text-[14px] text-center tracking-[0.14px] whitespace-nowrap">Тарифы</p>
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Buttons">
      <Block />
      <div className="bg-[rgba(25,25,25,0.05)] content-stretch flex h-[40px] items-center px-[12px] relative rounded-[10px] shrink-0" data-name="Header Button">
        <Content7 />
      </div>
    </div>
  );
}

function LeftAccessory() {
  return (
    <div className="content-stretch flex flex-col h-full items-start justify-center pr-[15px] relative shrink-0" data-name="Left Accessory">
      <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Magnifier">
        <div className="absolute inset-[8.33%_12.5%_12.5%_8.33%]" data-name="Icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.9999 18.9999">
            <path d={svgPaths.p31a59500} fill="var(--fill-0, #949494)" id="Icon" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col h-full items-start justify-center min-w-px relative" data-name="Content">
      <p className="font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[20px] not-italic overflow-hidden relative shrink-0 text-[#949494] text-[16px] text-ellipsis tracking-[0.16px] w-full whitespace-nowrap">Документ, дата, сумма или контрагент</p>
    </div>
  );
}

function Field() {
  return (
    <div className="bg-[rgba(25,25,25,0.05)] flex-[1_0_0] h-[44px] min-w-px relative rounded-[10px]" data-name="Field">
      <div className="content-stretch flex items-start px-[15px] relative size-full">
        <LeftAccessory />
        <Content8 />
      </div>
    </div>
  );
}

function LeftAccessory1() {
  return (
    <div className="content-stretch flex h-full items-center relative shrink-0" data-name="Left Accessory">
      <button className="block cursor-pointer overflow-clip relative shrink-0 size-[24px]" data-name="Checkbox">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Body" r="11.25" stroke="var(--stroke-0, #191919)" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

function Filters() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[10px] items-center min-w-px relative" data-name="Filters">
      <div className="flex flex-row items-center self-stretch">
        <LeftAccessory1 />
      </div>
      <div className="bg-[rgba(25,25,25,0.05)] content-stretch flex gap-[10px] items-center px-[10px] py-[7px] relative rounded-[10px] shrink-0" data-name="Chip">
        <div className="relative shrink-0 size-[18px]" data-name="Chip Left Accessory">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[18px] top-1/2" data-name="Stroked 2px/Filters">
            <div className="absolute inset-[12.5%_5%]" data-name="Icon">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.1992 13.5">
                <path d={svgPaths.p62f1200} fill="var(--fill-0, #191919)" id="Icon" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(25,25,25,0.05)] content-stretch flex gap-[10px] items-center px-[10px] py-[7px] relative rounded-[10px] shrink-0" data-name="Chip">
        <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#191919] text-[14px] tracking-[0.14px] whitespace-nowrap">Все</p>
      </div>
      <div className="content-stretch flex gap-[10px] items-center px-[10px] py-[7px] relative rounded-[10px] shrink-0" data-name="Chip">
        <div aria-hidden="true" className="absolute border-2 border-[rgba(25,25,25,0.45)] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#191919] text-[14px] tracking-[0.14px] whitespace-nowrap">Входящие</p>
        <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Chip Right Accessory">
          <div className="bg-[#835de1] content-stretch flex items-center justify-center px-[8px] py-[1.5px] relative rounded-[10px] shrink-0" data-name="Counter">
            <div className="flex flex-col font-['TT_Norms_Tochka_Extended:DemiBold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-center text-white tracking-[0.12px] whitespace-nowrap">
              <p className="leading-[15px]">1</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(25,25,25,0.05)] content-stretch flex gap-[10px] items-center px-[10px] py-[7px] relative rounded-[10px] shrink-0" data-name="Chip">
        <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#191919] text-[14px] text-center tracking-[0.14px] whitespace-nowrap">Исходящие</p>
      </div>
      <div className="bg-[rgba(25,25,25,0.05)] content-stretch flex gap-[10px] items-center px-[10px] py-[7px] relative rounded-[10px] shrink-0" data-name="Chip">
        <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#191919] text-[14px] tracking-[0.14px] whitespace-nowrap">На подпись</p>
      </div>
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0 w-full" data-name="Actions">
      <Filters />
      <div className="bg-[rgba(25,25,25,0.05)] content-stretch flex gap-[10px] items-center px-[10px] py-[7px] relative rounded-[10px] shrink-0" data-name="Chip">
        <div className="relative shrink-0 size-[18px]" data-name="Chip Left Accessory">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[18px] top-1/2" data-name="Stroked 2px/Receipt List Short">
            <div className="absolute inset-[9.98%_10%]" data-name="Icon">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.4004 14.4062">
                <path d={svgPaths.p1eacbb80} fill="var(--fill-0, #191919)" id="Icon" />
              </svg>
            </div>
          </div>
        </div>
        <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#191919] text-[14px] tracking-[0.14px] whitespace-nowrap">Авансовые отчёты</p>
      </div>
      <div className="bg-[rgba(25,25,25,0.05)] content-stretch flex gap-[10px] items-center px-[10px] py-[7px] relative rounded-[10px] shrink-0" data-name="Chip">
        <div className="relative shrink-0 size-[18px]" data-name="Chip Left Accessory">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[18px] top-1/2" data-name="Stroked 2px/Truck">
            <div className="absolute inset-[10%_5%_5%_5%]" data-name="Icon">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.1992 15.2998">
                <path d={svgPaths.p3070fa00} fill="var(--fill-0, #191919)" id="Icon" />
              </svg>
            </div>
          </div>
        </div>
        <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#191919] text-[14px] tracking-[0.14px] whitespace-nowrap">Транспортный ЭДО</p>
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex items-center pr-[10px] relative self-stretch shrink-0" data-name="Cell">
      <button className="block cursor-pointer opacity-0 overflow-clip relative shrink-0 size-[24px]" data-name="Checkbox">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Body" r="11.25" stroke="var(--stroke-0, #191919)" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex items-center px-[10px] py-[15px] relative shrink-0 w-[341px]" data-name="Header">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[18px] min-w-px not-italic overflow-hidden relative text-[#676767] text-[14px] text-ellipsis tracking-[0.14px] whitespace-nowrap">Документ</p>
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex items-center px-[10px] py-[15px] relative shrink-0 w-[365px]" data-name="Header">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[18px] min-w-px not-italic overflow-hidden relative text-[#676767] text-[14px] text-ellipsis tracking-[0.14px] whitespace-nowrap">Контрагент</p>
    </div>
  );
}

function Header3() {
  return (
    <div className="content-stretch flex items-center px-[10px] py-[15px] relative shrink-0 w-[100px]" data-name="Header">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[18px] min-w-px not-italic overflow-hidden relative text-[#676767] text-[14px] text-ellipsis tracking-[0.14px] whitespace-nowrap">Дата</p>
    </div>
  );
}

function Header4() {
  return (
    <div className="content-stretch flex items-center justify-end px-[10px] py-[15px] relative shrink-0 w-[110px]" data-name="Header">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[18px] min-w-px not-italic overflow-hidden relative text-[#676767] text-[14px] text-ellipsis text-right tracking-[0.14px] whitespace-nowrap">Сумма</p>
    </div>
  );
}

function Header5() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[15px] relative shrink-0 w-[80px]" data-name="Header">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[18px] min-w-px not-italic overflow-hidden relative text-[#676767] text-[14px] text-center text-ellipsis tracking-[0.14px] whitespace-nowrap">в 1С</p>
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex items-center pr-[10px] relative self-stretch shrink-0 w-[50px]" data-name="Cell">
      <button className="block cursor-pointer opacity-0 overflow-clip relative shrink-0 size-[24px]" data-name="Checkbox">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Body" r="11.25" stroke="var(--stroke-0, #191919)" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Header">
      <div aria-hidden="true" className="absolute bg-white inset-0 pointer-events-none" />
      <Cell />
      <Header1 />
      <Header2 />
      <Header3 />
      <Header4 />
      <Header5 />
      <Cell1 />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-0.5px_0px_0px_rgba(174,174,174,0.45)]" />
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex h-full items-center pr-[10px] relative shrink-0" data-name="Cell">
      <button className="block cursor-pointer overflow-clip relative shrink-0 size-[24px]" data-name="Checkbox">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Body" r="11.25" stroke="var(--stroke-0, #191919)" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[341px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[321px]">Счёт №104 от 25.02.26</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] relative shrink-0 text-[#676767] w-[321px]">
        <p className="leading-[18px]">Ждёт вашей подписи</p>
      </div>
    </div>
  );
}

function Cell4() {
  return (
    <div className="content-center flex flex-wrap gap-[2px] items-center not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[365px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[345px]">Юдин А.О., ИП</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] overflow-hidden relative shrink-0 text-[#676767] text-ellipsis whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden text-ellipsis">ИНН: 6658 3754 2612</p>
      </div>
    </div>
  );
}

function Cell5() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[100px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[18px] min-w-px not-italic relative text-[#191919] text-[14px] tracking-[0.14px]">25.02.26</p>
    </div>
  );
}

function Cell6() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[110px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[0] min-w-px not-italic relative text-[#191919] text-[14px] text-right tracking-[0.14px]">
        <span className="leading-[18px]">{`179 685 `}</span>
        <span className="leading-[18px]">₽</span>
      </p>
    </div>
  );
}

function Cell7() {
  return (
    <div className="content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0 w-[80px]" data-name="Cell">
      <div className="content-stretch flex items-center opacity-0 relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Watch">
          <div className="absolute inset-[8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p5862880} fill="var(--fill-0, #C8C8C8)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell8() {
  return (
    <div className="content-stretch flex h-full items-center justify-end overflow-clip relative shrink-0 w-[50px]" data-name="Cell">
      <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Dots Three Horizontal">
          <div className="absolute inset-[41.67%_8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 4">
              <path d={svgPaths.p3086b3f0} fill="var(--fill-0, #191919)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-center pr-[10px] relative shrink-0 w-[1080px]" data-name="Row">
      <div aria-hidden="true" className="absolute bg-white inset-0 pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <Cell2 />
      </div>
      <Cell3 />
      <Cell4 />
      <Cell5 />
      <Cell6 />
      <div className="flex flex-row items-center self-stretch">
        <Cell7 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Cell8 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-0.5px_0px_0px_rgba(174,174,174,0.45)]" />
    </div>
  );
}

function Cell9() {
  return (
    <div className="content-stretch flex h-full items-center pr-[10px] relative shrink-0" data-name="Cell">
      <button className="block cursor-pointer overflow-clip relative shrink-0 size-[24px]" data-name="Checkbox">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Body" r="11.25" stroke="var(--stroke-0, #191919)" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

function Cell10() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[341px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[321px]">Акт №467 от 25.02.26</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] relative shrink-0 text-[#3f9180] w-[321px]">
        <p className="leading-[18px]">Документ подписан</p>
      </div>
    </div>
  );
}

function Cell11() {
  return (
    <div className="content-center flex flex-wrap gap-[2px] items-center not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[365px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[345px]">Кашин А.О., ИП</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] overflow-hidden relative shrink-0 text-[#676767] text-ellipsis whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden text-ellipsis">ИНН: 8375 2478 1239</p>
      </div>
    </div>
  );
}

function Cell12() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[100px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[18px] min-w-px not-italic relative text-[#191919] text-[14px] tracking-[0.14px]">25.02.26</p>
    </div>
  );
}

function Cell13() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[110px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[0] min-w-px not-italic relative text-[#191919] text-[14px] text-right tracking-[0.14px]">
        <span className="leading-[18px]">{`451 533 `}</span>
        <span className="leading-[18px]">₽</span>
      </p>
    </div>
  );
}

function Cell14() {
  return (
    <div className="content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0 w-[80px]" data-name="Cell">
      <div className="content-stretch flex items-center opacity-0 relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Watch">
          <div className="absolute inset-[8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p5862880} fill="var(--fill-0, #C8C8C8)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell15() {
  return (
    <div className="content-stretch flex h-full items-center justify-end overflow-clip relative shrink-0 w-[50px]" data-name="Cell">
      <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Dots Three Horizontal">
          <div className="absolute inset-[41.67%_8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 4">
              <path d={svgPaths.p3086b3f0} fill="var(--fill-0, #191919)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-center pr-[10px] relative shrink-0 w-[1080px]" data-name="Row">
      <div aria-hidden="true" className="absolute bg-white inset-0 pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <Cell9 />
      </div>
      <Cell10 />
      <Cell11 />
      <Cell12 />
      <Cell13 />
      <div className="flex flex-row items-center self-stretch">
        <Cell14 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Cell15 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-0.5px_0px_0px_rgba(174,174,174,0.45)]" />
    </div>
  );
}

function Cell16() {
  return (
    <div className="content-stretch flex h-full items-center pr-[10px] relative shrink-0" data-name="Cell">
      <button className="block cursor-pointer overflow-clip relative shrink-0 size-[24px]" data-name="Checkbox">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Body" r="11.25" stroke="var(--stroke-0, #191919)" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

function Cell17() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[341px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[321px]">Акт №466 от 25.02.26</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] relative shrink-0 text-[#676767] w-[321px]">
        <p className="leading-[18px]">В процессе аннуляции</p>
      </div>
    </div>
  );
}

function Cell18() {
  return (
    <div className="content-center flex flex-wrap gap-[2px] items-center not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[365px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[345px]">Вараксин А.О., ИП</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] overflow-hidden relative shrink-0 text-[#676767] text-ellipsis whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden text-ellipsis">ИНН: 9013 3451 2345</p>
      </div>
    </div>
  );
}

function Cell19() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[100px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[18px] min-w-px not-italic relative text-[#191919] text-[14px] tracking-[0.14px]">25.02.26</p>
    </div>
  );
}

function Cell20() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[110px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[0] min-w-px not-italic relative text-[#191919] text-[14px] text-right tracking-[0.14px]">
        <span className="leading-[18px]">{`112 254 `}</span>
        <span className="leading-[18px]">₽</span>
      </p>
    </div>
  );
}

function Cell21() {
  return (
    <div className="content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0 w-[80px]" data-name="Cell">
      <div className="content-stretch flex items-center opacity-0 relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Watch">
          <div className="absolute inset-[8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p5862880} fill="var(--fill-0, #C8C8C8)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell22() {
  return (
    <div className="content-stretch flex h-full items-center justify-end overflow-clip relative shrink-0 w-[50px]" data-name="Cell">
      <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Dots Three Horizontal">
          <div className="absolute inset-[41.67%_8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 4">
              <path d={svgPaths.p3086b3f0} fill="var(--fill-0, #191919)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-center pr-[10px] relative shrink-0 w-[1080px]" data-name="Row">
      <div aria-hidden="true" className="absolute bg-white inset-0 pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <Cell16 />
      </div>
      <Cell17 />
      <Cell18 />
      <Cell19 />
      <Cell20 />
      <div className="flex flex-row items-center self-stretch">
        <Cell21 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Cell22 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-0.5px_0px_0px_rgba(174,174,174,0.45)]" />
    </div>
  );
}

function Cell23() {
  return (
    <div className="content-stretch flex h-full items-center pr-[10px] relative shrink-0" data-name="Cell">
      <button className="block cursor-pointer overflow-clip relative shrink-0 size-[24px]" data-name="Checkbox">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Body" r="11.25" stroke="var(--stroke-0, #191919)" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

function Cell24() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[341px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[321px]">Накладная №175 от 24.02.26</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] relative shrink-0 text-[#676767] w-[321px]">
        <p className="leading-[18px]">Ждёт подписи контрагента</p>
      </div>
    </div>
  );
}

function Cell25() {
  return (
    <div className="content-center flex flex-wrap gap-[2px] items-center not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[365px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[345px]">Смолин А.О., ИП</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] overflow-hidden relative shrink-0 text-[#676767] text-ellipsis whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden text-ellipsis">ИНН: 1738 3467 1930</p>
      </div>
    </div>
  );
}

function Cell26() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[100px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[18px] min-w-px not-italic relative text-[#191919] text-[14px] tracking-[0.14px]">24.02.26</p>
    </div>
  );
}

function Cell27() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[110px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[0] min-w-px not-italic relative text-[#191919] text-[14px] text-right tracking-[0.14px]">
        <span className="leading-[18px]">{`126 797 `}</span>
        <span className="leading-[18px]">₽</span>
      </p>
    </div>
  );
}

function Cell28() {
  return (
    <div className="content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0 w-[80px]" data-name="Cell">
      <div className="content-stretch flex items-center opacity-0 relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Watch">
          <div className="absolute inset-[8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p5862880} fill="var(--fill-0, #C8C8C8)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell29() {
  return (
    <div className="content-stretch flex h-full items-center justify-end overflow-clip relative shrink-0 w-[50px]" data-name="Cell">
      <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Dots Three Horizontal">
          <div className="absolute inset-[41.67%_8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 4">
              <path d={svgPaths.p3086b3f0} fill="var(--fill-0, #191919)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex items-center pr-[10px] relative shrink-0 w-[1080px]" data-name="Row">
      <div aria-hidden="true" className="absolute bg-white inset-0 pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <Cell23 />
      </div>
      <Cell24 />
      <Cell25 />
      <Cell26 />
      <Cell27 />
      <div className="flex flex-row items-center self-stretch">
        <Cell28 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Cell29 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-0.5px_0px_0px_rgba(174,174,174,0.45)]" />
    </div>
  );
}

function Cell30() {
  return (
    <div className="content-stretch flex h-full items-center pr-[10px] relative shrink-0" data-name="Cell">
      <button className="block cursor-pointer overflow-clip relative shrink-0 size-[24px]" data-name="Checkbox">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Body" r="11.25" stroke="var(--stroke-0, #191919)" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

function Cell31() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[341px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[321px]">Счёт №105 от 24.02.26</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] relative shrink-0 text-[#676767] w-[321px]">
        <p className="leading-[18px]">Ожидает оплаты</p>
      </div>
    </div>
  );
}

function Cell32() {
  return (
    <div className="content-center flex flex-wrap gap-[2px] items-center not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[365px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[345px]">Викториал, ООО</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] overflow-hidden relative shrink-0 text-[#676767] text-ellipsis whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden text-ellipsis">ИНН: 7183 9013 5672</p>
      </div>
    </div>
  );
}

function Cell33() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[100px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[18px] min-w-px not-italic relative text-[#191919] text-[14px] tracking-[0.14px]">24.02.26</p>
    </div>
  );
}

function Cell34() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[110px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[0] min-w-px not-italic relative text-[#191919] text-[14px] text-right tracking-[0.14px]">
        <span className="leading-[18px]">{`463 784 `}</span>
        <span className="leading-[18px]">₽</span>
      </p>
    </div>
  );
}

function Cell35() {
  return (
    <div className="content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0 w-[80px]" data-name="Cell">
      <div className="content-stretch flex items-center opacity-0 relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Watch">
          <div className="absolute inset-[8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p5862880} fill="var(--fill-0, #C8C8C8)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell36() {
  return (
    <div className="content-stretch flex h-full items-center justify-end overflow-clip relative shrink-0 w-[50px]" data-name="Cell">
      <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Dots Three Horizontal">
          <div className="absolute inset-[41.67%_8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 4">
              <path d={svgPaths.p3086b3f0} fill="var(--fill-0, #191919)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row4() {
  return (
    <div className="content-stretch flex items-center pr-[10px] relative shrink-0 w-[1080px]" data-name="Row">
      <div aria-hidden="true" className="absolute bg-white inset-0 pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <Cell30 />
      </div>
      <Cell31 />
      <Cell32 />
      <Cell33 />
      <Cell34 />
      <div className="flex flex-row items-center self-stretch">
        <Cell35 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Cell36 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-0.5px_0px_0px_rgba(174,174,174,0.45)]" />
    </div>
  );
}

function Cell37() {
  return (
    <div className="content-stretch flex h-full items-center pr-[10px] relative shrink-0" data-name="Cell">
      <button className="block cursor-pointer overflow-clip relative shrink-0 size-[24px]" data-name="Checkbox">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Body" r="11.25" stroke="var(--stroke-0, #191919)" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

function Cell38() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[341px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[321px]">Счёт №104 от 23.02.26</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] relative shrink-0 text-[#676767] w-[321px]">
        <p className="leading-[18px]">Ожидает оплаты</p>
      </div>
    </div>
  );
}

function Cell39() {
  return (
    <div className="content-center flex flex-wrap gap-[2px] items-center not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[365px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[345px]">Юдин А.О., ИП</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] overflow-hidden relative shrink-0 text-[#676767] text-ellipsis whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden text-ellipsis">ИНН: 6658 3754 2612</p>
      </div>
    </div>
  );
}

function Cell40() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[100px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[18px] min-w-px not-italic relative text-[#191919] text-[14px] tracking-[0.14px]">23.02.26</p>
    </div>
  );
}

function Cell41() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[110px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[0] min-w-px not-italic relative text-[#191919] text-[14px] text-right tracking-[0.14px]">
        <span className="leading-[18px]">{`143 978 `}</span>
        <span className="leading-[18px]">₽</span>
      </p>
    </div>
  );
}

function Cell42() {
  return (
    <div className="content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0 w-[80px]" data-name="Cell">
      <div className="content-stretch flex items-center opacity-0 relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Watch">
          <div className="absolute inset-[8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p5862880} fill="var(--fill-0, #C8C8C8)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell43() {
  return (
    <div className="content-stretch flex h-full items-center justify-end overflow-clip relative shrink-0 w-[50px]" data-name="Cell">
      <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Dots Three Horizontal">
          <div className="absolute inset-[41.67%_8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 4">
              <path d={svgPaths.p3086b3f0} fill="var(--fill-0, #191919)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row5() {
  return (
    <div className="content-stretch flex items-center pr-[10px] relative shrink-0 w-[1080px]" data-name="Row">
      <div aria-hidden="true" className="absolute bg-white inset-0 pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <Cell37 />
      </div>
      <Cell38 />
      <Cell39 />
      <Cell40 />
      <Cell41 />
      <div className="flex flex-row items-center self-stretch">
        <Cell42 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Cell43 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-0.5px_0px_0px_rgba(174,174,174,0.45)]" />
    </div>
  );
}

function Cell44() {
  return (
    <div className="content-stretch flex h-full items-center pr-[10px] relative shrink-0" data-name="Cell">
      <button className="block cursor-pointer overflow-clip relative shrink-0 size-[24px]" data-name="Checkbox">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Body" r="11.25" stroke="var(--stroke-0, #191919)" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

function Cell45() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[341px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[321px]">Акт №465 от 20.02.26</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] relative shrink-0 text-[#676767] w-[321px]">
        <p className="leading-[18px]">В процессе аннуляции</p>
      </div>
    </div>
  );
}

function Cell46() {
  return (
    <div className="content-center flex flex-wrap gap-[2px] items-center not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[365px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[345px]">Кашин А.О., ИП</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] overflow-hidden relative shrink-0 text-[#676767] text-ellipsis whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden text-ellipsis">ИНН: 8375 2478 1239</p>
      </div>
    </div>
  );
}

function Cell47() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[100px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[18px] min-w-px not-italic relative text-[#191919] text-[14px] tracking-[0.14px]">20.02.26</p>
    </div>
  );
}

function Cell48() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[110px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[0] min-w-px not-italic relative text-[#191919] text-[14px] text-right tracking-[0.14px]">
        <span className="leading-[18px]">{`456 909 `}</span>
        <span className="leading-[18px]">₽</span>
      </p>
    </div>
  );
}

function Cell49() {
  return (
    <div className="content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0 w-[80px]" data-name="Cell">
      <div className="content-stretch flex items-center opacity-0 relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Watch">
          <div className="absolute inset-[8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p5862880} fill="var(--fill-0, #C8C8C8)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell50() {
  return (
    <div className="content-stretch flex h-full items-center justify-end overflow-clip relative shrink-0 w-[50px]" data-name="Cell">
      <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Dots Three Horizontal">
          <div className="absolute inset-[41.67%_8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 4">
              <path d={svgPaths.p3086b3f0} fill="var(--fill-0, #191919)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row6() {
  return (
    <div className="content-stretch flex items-center pr-[10px] relative shrink-0 w-[1080px]" data-name="Row">
      <div aria-hidden="true" className="absolute bg-white inset-0 pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <Cell44 />
      </div>
      <Cell45 />
      <Cell46 />
      <Cell47 />
      <Cell48 />
      <div className="flex flex-row items-center self-stretch">
        <Cell49 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Cell50 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-0.5px_0px_0px_rgba(174,174,174,0.45)]" />
    </div>
  );
}

function Cell51() {
  return (
    <div className="content-stretch flex h-full items-center pr-[10px] relative shrink-0" data-name="Cell">
      <button className="block cursor-pointer overflow-clip relative shrink-0 size-[24px]" data-name="Checkbox">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Body" r="11.25" stroke="var(--stroke-0, #191919)" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

function Cell52() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[341px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[321px]">Договор №756 от 20.02.26</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] relative shrink-0 text-[#3f9180] w-[321px]">
        <p className="leading-[18px]">Документ подписан</p>
      </div>
    </div>
  );
}

function Cell53() {
  return (
    <div className="content-center flex flex-wrap gap-[2px] items-center not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[365px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[345px]">Вараксин А.О., ИП</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] overflow-hidden relative shrink-0 text-[#676767] text-ellipsis whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden text-ellipsis">ИНН: 9013 3451 2345</p>
      </div>
    </div>
  );
}

function Cell54() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[100px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[18px] min-w-px not-italic relative text-[#191919] text-[14px] tracking-[0.14px]">20.02.26</p>
    </div>
  );
}

function Cell55() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[110px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[0] min-w-px not-italic relative text-[#191919] text-[14px] text-right tracking-[0.14px]">
        <span className="leading-[18px]">{`320 263 `}</span>
        <span className="leading-[18px]">₽</span>
      </p>
    </div>
  );
}

function Cell56() {
  return (
    <div className="content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0 w-[80px]" data-name="Cell">
      <div className="content-stretch flex items-center opacity-0 relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Watch">
          <div className="absolute inset-[8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p5862880} fill="var(--fill-0, #C8C8C8)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell57() {
  return (
    <div className="content-stretch flex h-full items-center justify-end overflow-clip relative shrink-0 w-[50px]" data-name="Cell">
      <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Dots Three Horizontal">
          <div className="absolute inset-[41.67%_8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 4">
              <path d={svgPaths.p3086b3f0} fill="var(--fill-0, #191919)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row7() {
  return (
    <div className="content-stretch flex items-center pr-[10px] relative shrink-0 w-[1080px]" data-name="Row">
      <div aria-hidden="true" className="absolute bg-white inset-0 pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <Cell51 />
      </div>
      <Cell52 />
      <Cell53 />
      <Cell54 />
      <Cell55 />
      <div className="flex flex-row items-center self-stretch">
        <Cell56 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Cell57 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-0.5px_0px_0px_rgba(174,174,174,0.45)]" />
    </div>
  );
}

function Cell58() {
  return (
    <div className="content-stretch flex h-full items-center pr-[10px] relative shrink-0" data-name="Cell">
      <button className="block cursor-pointer overflow-clip relative shrink-0 size-[24px]" data-name="Checkbox">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Body" r="11.25" stroke="var(--stroke-0, #191919)" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

function Cell59() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[341px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[321px]">Договор №755 от 19.02.26</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] relative shrink-0 text-[#3f9180] w-[321px]">
        <p className="leading-[18px]">Документ подписан</p>
      </div>
    </div>
  );
}

function Cell60() {
  return (
    <div className="content-center flex flex-wrap gap-[2px] items-center not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[365px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[345px]">Смолин А.О., ИП</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] overflow-hidden relative shrink-0 text-[#676767] text-ellipsis whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden text-ellipsis">ИНН: 1738 3467 1930</p>
      </div>
    </div>
  );
}

function Cell61() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[100px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[18px] min-w-px not-italic relative text-[#191919] text-[14px] tracking-[0.14px]">19.02.26</p>
    </div>
  );
}

function Cell62() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[110px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[0] min-w-px not-italic relative text-[#191919] text-[14px] text-right tracking-[0.14px]">
        <span className="leading-[18px]">{`196 823 `}</span>
        <span className="leading-[18px]">₽</span>
      </p>
    </div>
  );
}

function Cell63() {
  return (
    <div className="content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0 w-[80px]" data-name="Cell">
      <div className="content-stretch flex items-center opacity-0 relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Watch">
          <div className="absolute inset-[8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p5862880} fill="var(--fill-0, #C8C8C8)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell64() {
  return (
    <div className="content-stretch flex h-full items-center justify-end overflow-clip relative shrink-0 w-[50px]" data-name="Cell">
      <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Dots Three Horizontal">
          <div className="absolute inset-[41.67%_8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 4">
              <path d={svgPaths.p3086b3f0} fill="var(--fill-0, #191919)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row8() {
  return (
    <div className="content-stretch flex items-center pr-[10px] relative shrink-0 w-[1080px]" data-name="Row">
      <div aria-hidden="true" className="absolute bg-white inset-0 pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <Cell58 />
      </div>
      <Cell59 />
      <Cell60 />
      <Cell61 />
      <Cell62 />
      <div className="flex flex-row items-center self-stretch">
        <Cell63 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Cell64 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-0.5px_0px_0px_rgba(174,174,174,0.45)]" />
    </div>
  );
}

function Cell65() {
  return (
    <div className="content-stretch flex h-full items-center pr-[10px] relative shrink-0" data-name="Cell">
      <button className="block cursor-pointer overflow-clip relative shrink-0 size-[24px]" data-name="Checkbox">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" id="Body" r="11.25" stroke="var(--stroke-0, #191919)" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}

function Cell66() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[341px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[321px]">Акт №464 от 18.02.26</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] relative shrink-0 text-[#676767] w-[321px]">
        <p className="leading-[18px]">Ждёт подписи контрагента</p>
      </div>
    </div>
  );
}

function Cell67() {
  return (
    <div className="content-center flex flex-wrap gap-[2px] items-center not-italic p-[10px] relative shrink-0 text-[14px] tracking-[0.14px] w-[365px]" data-name="Cell">
      <p className="font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] relative shrink-0 text-[#191919] w-[345px]">Викториал, ООО</p>
      <div className="flex flex-col font-['TT_Norms_Tochka_Extended:Regular',sans-serif] justify-end leading-[0] overflow-hidden relative shrink-0 text-[#676767] text-ellipsis whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden text-ellipsis">ИНН: 7183 9013 5672</p>
      </div>
    </div>
  );
}

function Cell68() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[100px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[18px] min-w-px not-italic relative text-[#191919] text-[14px] tracking-[0.14px]">18.02.26</p>
    </div>
  );
}

function Cell69() {
  return (
    <div className="content-stretch flex items-center justify-center px-[10px] py-[20px] relative shrink-0 w-[110px]" data-name="Cell">
      <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Regular',sans-serif] leading-[0] min-w-px not-italic relative text-[#191919] text-[14px] text-right tracking-[0.14px]">
        <span className="leading-[18px]">{`470 435 `}</span>
        <span className="leading-[18px]">₽</span>
      </p>
    </div>
  );
}

function Cell70() {
  return (
    <div className="content-stretch flex h-full items-center justify-center overflow-clip relative shrink-0 w-[80px]" data-name="Cell">
      <div className="content-stretch flex items-center opacity-0 relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Watch">
          <div className="absolute inset-[8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
              <path d={svgPaths.p5862880} fill="var(--fill-0, #C8C8C8)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cell71() {
  return (
    <div className="content-stretch flex h-full items-center justify-end overflow-clip relative shrink-0 w-[50px]" data-name="Cell">
      <div className="content-stretch flex items-center relative shrink-0 size-[24px]" data-name="Right Accessory">
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Dots Three Horizontal">
          <div className="absolute inset-[41.67%_8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 4">
              <path d={svgPaths.p3086b3f0} fill="var(--fill-0, #191919)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row9() {
  return (
    <div className="content-stretch flex items-center pr-[10px] relative shrink-0 w-[1080px]" data-name="Row">
      <div aria-hidden="true" className="absolute bg-white inset-0 pointer-events-none" />
      <div className="flex flex-row items-center self-stretch">
        <Cell65 />
      </div>
      <Cell66 />
      <Cell67 />
      <Cell68 />
      <Cell69 />
      <div className="flex flex-row items-center self-stretch">
        <Cell70 />
      </div>
      <div className="flex flex-row items-center self-stretch">
        <Cell71 />
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-0.5px_0px_0px_rgba(174,174,174,0.45)]" />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full" data-name="List">
      <Row />
      <Row1 />
      <Row2 />
      <Row3 />
      <Row4 />
      <Row5 />
      <Row6 />
      <Row7 />
      <Row8 />
      <Row9 />
    </div>
  );
}

function Table1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px relative w-full" data-name="Table">
      <Header />
      <List />
      <div className="absolute bg-[#303030] content-stretch drop-shadow-[0px_6px_5px_rgba(0,0,0,0.1)] flex gap-[20px] items-center justify-center left-[780px] p-[20px] rounded-[12px] top-[-5px] w-[300px]" data-name="Сoach Desktop">
        <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] min-w-px not-italic overflow-hidden relative text-[14px] text-ellipsis text-white tracking-[0.14px]">Транспортные накладные будут здесь</p>
        <div className="absolute flex h-[10px] items-center justify-center right-[40px] top-[-10px] w-[36px]">
          <div className="flex-none rotate-180">
            <div className="h-[10px] relative w-[36px]" data-name="Path">
              <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36 10">
                <path clipRule="evenodd" d={svgPaths.p2c9af7e0} fill="var(--fill-0, #303030)" fillRule="evenodd" id="Path" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px relative w-full" data-name="Table">
      <div className="content-stretch flex gap-[10px] h-[44px] items-center relative shrink-0 w-full" data-name="Main Page Search Field">
        <Field />
      </div>
      <Actions1 />
      <Table1 />
    </div>
  );
}

function Content3() {
  return (
    <div className="h-full relative shrink-0 w-[1120px]" data-name="Content">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[30px] items-center pb-[64px] pt-[32px] px-[20px] relative size-full">
          <Buttons />
          <Table />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative shrink-0 w-full" data-name="Button">
      <div className="content-stretch flex items-center justify-center px-px relative rounded-[10px] shrink-0 size-[40px]" data-name="Navbar Button">
        <div aria-hidden="true" className="absolute border border-[rgba(25,25,25,0.45)] border-solid inset-0 pointer-events-none rounded-[10px]" />
        <div className="relative shrink-0 size-[24px]" data-name="Stroked 2px/Arrow Left">
          <div className="absolute inset-[16.67%_8.33%]" data-name="Icon">
            <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.9999 15.9998">
              <path d={svgPaths.p21fd6800} fill="var(--fill-0, #191919)" id="Icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0 w-full" data-name="Title">
      <div className="content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="Navbar Title">
        <p className="font-['TT_Norms_Tochka_Extended:DemiBold',sans-serif] leading-[30px] not-italic overflow-hidden relative shrink-0 text-[#191919] text-[24px] text-ellipsis w-full">Документооборот</p>
      </div>
    </div>
  );
}

function Items() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Items">
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Navigation Item 1">
        <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] min-w-px not-italic relative text-[#191919] text-[14px] tracking-[0.14px]">Создать платёж</p>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Navigation Item 2">
        <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] min-w-px not-italic relative text-[#191919] text-[14px] tracking-[0.14px]">Контрагенты</p>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Navigation Item 3">
        <p className="flex-[1_0_0] font-['TT_Norms_Tochka_Extended:Medium',sans-serif] leading-[18px] min-w-px not-italic relative text-[#191919] text-[14px] tracking-[0.14px]">Бухгалтерия</p>
      </div>
    </div>
  );
}

function LayoutFull() {
  return (
    <div className="content-stretch flex gap-[80px] h-[826px] items-start justify-end relative shrink-0 w-[1440px]" data-name="Layout Full">
      <Content3 />
      <div className="absolute content-stretch flex flex-col gap-[40px] items-start left-0 pt-[32px] px-[20px] top-0 w-[280px]" data-name="Navigation Bar">
        <Button />
        <Title />
        <Items />
      </div>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Коуч">
      <div className="bg-white content-stretch flex h-[74px] items-center max-h-[74px] max-w-[1919px] min-h-[74px] min-w-[1024px] py-[20px] relative shrink-0 w-full" data-name="🛠 Main Page Navigation Bar">
        <Content />
        <div className="absolute bg-[#e1e1e1] bottom-0 h-px left-0 right-0" data-name="Separate Line" />
      </div>
      <LayoutFull />
    </div>
  );
}