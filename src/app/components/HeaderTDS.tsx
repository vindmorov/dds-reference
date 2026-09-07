import { TrendingUp, Bell, Gift, Settings, LogOut } from 'lucide-react';

export function HeaderTDS() {
  return (
    <header className="bg-white border-b border-[rgba(174,174,174,0.45)] sticky top-0 z-50">
      <div className="flex items-center h-[56px] md:h-[64px] px-3 md:px-5">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3 md:px-5 shrink-0">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="p-1 md:p-1.5 bg-[rgba(131,93,225,0.15)] rounded-lg">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#835DE1]" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] md:text-[14px] font-semibold text-[#191919] leading-tight">AI Finance</span>
              <span className="text-[9px] md:text-[10px] text-[#676767] leading-tight hidden sm:block">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="hidden lg:flex flex-1 items-center gap-2.5 px-5">
          {['Главная', 'Платежи', 'Сервисы'].map(label => (
            <button key={label} className="px-[15px] py-2.5 rounded-[10px] hover:bg-[rgba(25,25,25,0.05)] transition-colors cursor-pointer">
              <span className="text-[16px] font-medium text-[#191919] tracking-[0.16px]">{label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 lg:hidden" />

        {/* User & Actions */}
        <div className="flex items-center gap-2 md:gap-5 md:px-5 shrink-0">
          <div className="flex items-center gap-1.5 md:gap-2.5">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[14px] md:text-[16px] font-medium text-[#191919] tracking-[0.16px]">Носковец О.Н., ИП</span>
            </div>
            <div
              className="w-8 h-8 md:w-[34px] md:h-[34px] rounded-full flex items-center justify-center text-white text-[13px] font-semibold select-none"
              style={{ backgroundColor: '#95AEE2' }}
            >
              НО
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative">
              <button className="p-2 rounded-[10px] border border-[rgba(174,174,174,0.45)] hover:bg-[rgba(25,25,25,0.05)] transition-colors cursor-pointer">
                <Bell className="w-5 h-5 md:w-6 md:h-6 text-[#191919]" />
              </button>
              <div className="absolute top-0 right-0 w-2 h-2 bg-[#D84D4D] rounded-full" />
            </div>
            <div className="hidden md:block">
              <button className="p-2 rounded-[10px] border border-[rgba(174,174,174,0.45)] hover:bg-[rgba(25,25,25,0.05)] transition-colors cursor-pointer">
                <Gift className="w-6 h-6 text-[#191919]" />
              </button>
            </div>
            <div className="hidden sm:block">
              <button className="p-2 rounded-[10px] border border-[rgba(174,174,174,0.45)] hover:bg-[rgba(25,25,25,0.05)] transition-colors cursor-pointer">
                <Settings className="w-6 h-6 text-[#191919]" />
              </button>
            </div>
            <div className="hidden md:block">
              <button className="p-2 rounded-[10px] border border-[rgba(174,174,174,0.45)] hover:bg-[rgba(25,25,25,0.05)] transition-colors cursor-pointer">
                <LogOut className="w-6 h-6 text-[#191919]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
