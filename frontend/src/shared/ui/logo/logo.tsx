import { type LogoProps } from "./model";

export const Logo = ({ width = 100, height = 32, className }: LogoProps) => {

  const viewBoxHeight = (height / width) * 100;
  
  return (
    <svg 
      width={width} 
      height={height}
      viewBox={`0 0 100 ${viewBoxHeight}`}
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100" height={viewBoxHeight} rx="6" fill="#247595"/>
      
      <text 
        x="50%" 
        y={viewBoxHeight * 0.7} 
        fontFamily="Arial" 
        fontSize={viewBoxHeight * 0.5} 
        fontWeight="bold" 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="middle"
      >
        TodoApp
      </text>
      

      <circle cx="18" cy={viewBoxHeight / 2} r={viewBoxHeight * 0.15} fill="#FFD700"/>
      <path 
        d={`M18 ${viewBoxHeight * 0.35} L20 ${viewBoxHeight / 2} L18 ${viewBoxHeight * 0.65} L16 ${viewBoxHeight / 2} Z`} 
        fill="white"
      />
    </svg>
  );
};