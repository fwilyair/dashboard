import React from 'react';
import { useTheme } from '../ThemeContext';

export const ReleasePanel: React.FC = () => {
    const { isDark } = useTheme();

    return (
        <div className="w-full h-full flex flex-col px-8">
            {/* 顶部标题 */}
            <div className="text-center mb-6 pt-2">
                <h2 className={`text-6xl font-black leading-none mb-2 tracking-wide ${isDark ? 'text-white' : 'text-slate-700'}`}>
                    放行看板
                </h2>
            </div>

            {/* 占位内容 */}
            <div className="flex-1 flex items-center justify-center">
                <span className={`text-2xl ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    待开发
                </span>
            </div>
        </div>
    );
};
