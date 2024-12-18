export interface Layout {
  title: string;
  xaxis: { title: string };
  yaxis: { title: string; scaleanchor: string };
  showlegend: boolean;
  annotations: Array<{
    x: number;
    y: number;
    xref: string;
    yref: string;
    text: string;
    showarrow: boolean;
    arrowhead: number;
  }>;
}