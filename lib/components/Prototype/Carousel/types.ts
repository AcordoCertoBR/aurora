export interface CarouselProps {
  items: JSX.Element[];
  type: 'pages' | 'scrollbar';
  mobileText?: string;
  draggable?: boolean;
}
