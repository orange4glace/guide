interface IGrid {
    gridSize: number;
    subgrids: number;
}
export interface IGuideGridProvider {
    (guide: Guide, index: number): IGrid;
}
interface IIGuideOption {
    minGridLength: number;
    gridProvider: IGuideGridProvider;
    textProvider?: (index: number) => string;
    theme: IGuideTheme;
}
export interface IGuideOption extends Partial<IIGuideOption> {
}
export interface IGuideTheme {
    backgroundColor: string;
    gridColor: string;
    textColor: string;
}
export declare class Guide {
    private readonly parent_;
    private canvasEl_;
    private ctx_;
    private option_;
    get option(): IIGuideOption;
    private width_;
    get width(): number;
    private height_;
    get height(): number;
    private start_;
    get start(): number;
    private end_;
    get end(): number;
    constructor(parent_: HTMLElement, option: IGuideOption, width: number, height: number);
    updateOption(option: IGuideOption): void;
    layout(width: number, height: number): void;
    setRange(start: number, end: number): void;
    private findAppropriateGridSize;
    private update;
}
export {};
