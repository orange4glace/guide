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

export interface IGuideOption extends Partial<IIGuideOption> {}

export interface IGuideTheme {
  backgroundColor: string;
  gridColor: string;
  textColor: string;
}

const defaultTheme: IGuideTheme = {
  backgroundColor: '#232323',
  gridColor: '#4f4f4f',
  textColor: '#a3a3a3',
}

const defaultOption: IIGuideOption = {
  minGridLength: 80,
  gridProvider: (guide: Guide, index: number) => {
    const baselines = [1, 2, 5, 10];
    if (index >= 4) {
      return {
        gridSize: 30 * Math.pow(2, index - 4),
        subgrids: 10
      };
    }
    else {
      return  {
        gridSize: baselines[index],
        subgrids: 10
      }
    }
  },
  theme: defaultTheme
}

export class Guide {

  private canvasEl_: HTMLCanvasElement;
  private ctx_: CanvasRenderingContext2D;

  private option_: IIGuideOption;
  get option() { return this.option_; }

  private width_: number;
  get width() { return this.width_; }
  private height_: number;
  get height() { return this.height_; }

  private start_: number;
  get start() { return this.start_; }
  private end_: number;
  get end() { return this.end_; }

  constructor(
    private readonly parent_: HTMLElement,
    option: IGuideOption,
    width: number, height: number
  ) {
    this.canvasEl_ = document.createElement('canvas');
    this.ctx_ = this.canvasEl_.getContext('2d');
    this.parent_.append(this.canvasEl_);
    this.updateOption({
      ...defaultOption,
      ...option
    })
    this.layout(width, height);
  }

  updateOption(option: IGuideOption) {
    this.option_ = {
      ...this.option_,
      ...option
    };
    this.update();
  }

  layout(width: number, height: number) {
    this.width_ = width;
    this.height_ = height;
    this.canvasEl_.width = width;
    this.canvasEl_.height = height;

    this.update();
  }

  setRange(start: number, end: number) {
    this.start_ = start;
    this.end_ = end;
    this.update();
  }

  private findAppropriateGridSize(): IGrid {
    const minGridLength = this.option_.minGridLength;
    const lengthPerUnit = this.width / (this.end - this.start);
    let lo = 0;
    let hi = 10000000;
    let ret: IGrid;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const grid = this.option_.gridProvider(this, mid);
      const gridLength = grid.gridSize * lengthPerUnit;
      if (gridLength < minGridLength) {
        lo = mid + 1;
      }
      else {
        ret = grid;
        hi = mid - 1;
      }
    }
    return ret;
  }

  private update() {
    this.ctx_.fillStyle = this.option_.theme.backgroundColor;
    this.ctx_.fillRect(0, 0, this.width, this.height);
    this.ctx_.strokeStyle = this.option_.theme.gridColor;
    const grid = this.findAppropriateGridSize();
    const units = this.end - this.start;
    const lenPerUnit = this.width / units;
    const startI = Math.floor(this.start / grid.gridSize) * grid.gridSize;
    const endI = Math.ceil(this.end / grid.gridSize) * grid.gridSize;
    const posBase = (lenPerUnit * this.start);
    this.ctx_.save();
    this.ctx_.translate(Math.round(-posBase), 0);
    this.ctx_.translate(0.5, 0.5);
    for (let i = startI; i < endI; i += grid.gridSize) {
      const pos = Math.floor(lenPerUnit * i);
      this.ctx_.beginPath();
      this.ctx_.moveTo(pos, this.height);
      this.ctx_.lineTo(pos, 15);
      this.ctx_.stroke();
      const text = this.option_.textProvider && this.option_.textProvider(i);
      if (text) {
        const met = this.ctx_.measureText(text);
        const textPos = Math.floor(pos - met.width / 2);
        this.ctx_.fillStyle = this.option_.theme.textColor;
        this.ctx_.fillText(text, textPos, 10);
      }
      for (let j = 1; j < grid.subgrids; j ++) {
        const subI = i + grid.gridSize / grid.subgrids * j;
        const subPos = Math.floor(lenPerUnit * subI);
        this.ctx_.beginPath();
        this.ctx_.moveTo(subPos, this.height);
        this.ctx_.lineTo(subPos, 20);
        this.ctx_.stroke();
      }
    }
    this.ctx_.restore();
  }
  
}