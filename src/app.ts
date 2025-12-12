class Game {
  private outputElement: HTMLElement;
  private inputElement: HTMLInputElement;
  private startTime: number;

  constructor() {
    this.outputElement = document.getElementById('output')!;
    this.inputElement = document.getElementById('userInput') as HTMLInputElement;
    this.startTime = Date.now();
    this.inputElement.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        const input = this.inputElement.value.trim();
        if (input) {
          this.processInput(input);
          this.inputElement.value = '';
        }
      }
    });
  }

  start(): void {
    // TODO: Initialize game state here (e.g., player stats, inventory, etc.)
    this.clearOutput();
    this.print("按照提示填满下面七行，提示：每行之间的词语仅相差一个字");
    this.print("玩法：首先按照顺序和提示完成2～6行，完成后会给出第一和第七行的提示");
    this.print("========================================");

    this.print(this.getEdgeColumnContent(true));
    this.print(this.getCommonColumnContent(1));
    this.print(this.getCommonColumnContent(2));
    this.print(this.getCommonColumnContent(3));
    this.print(this.getCommonColumnContent(4));
    this.print(this.getCommonColumnContent(5));
    this.print(this.getEdgeColumnContent(false));

    this.print(`提示：${this.prompts[this.columnPointer]}`);

    // TODO: Implement main game loop or menu here
    // this.mainMenu();
  }

  private getEdgeColumnContent(isTop: boolean): string {
    if (this.isDone) {
        return this.answers[isTop ? 0 : 6];
    }
    if (this.columnPointer === 0) {
        return isTop ? ' - - < ' : ' - - ';
    }
    if (this.columnPointer === 6) {
        return isTop ? this.answers[0] : ' - - < ';
    }
    return ' - - ';
  }

  private isDone: boolean = false;

  private getCommonColumnContent(column: number): string {
    if (column === this.columnPointer) {
        return ' - - < ';
    }
    if (this.columnPointer > column || this.columnPointer === 0 || this.columnPointer === 6) {
        return this.answers[column];
    }
    return ' - - ';
  }

  private answers: string[] = [
    '北京',
    '北极',
    '电极',
    '电车',
    '火车',
    '火海',
    '上海'
  ]

  private columnPointer: number = 1;

  private prompts: string[] = [
    '中国有名的城市',
    '地球的某一地理位置，在地球的两端的其中一个',
    '有正负区分的，常见于遥控器等需要电池的电子设备',
    '既指代一种不太常见的公共交通工具，又可以指当前流行的一种交通工具',
    '非常常见的长途交通工具',
    '一种十分危险的环境，常常需要专业团队进行救援',
    '中国有名的城市',
  ]

  processInput(input: string): void {
    // TODO: Implement input processing logic
    // For now, just echo the input
    const correctAnswer = this.answers[this.columnPointer];
    if (input === correctAnswer) {
        if (this.columnPointer === 6) {
            this.isDone = true;
            this.start(); // Update the display to show the completed grid
            const elapsed = Date.now() - this.startTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            this.print(`Game completed in ${timeStr}`);
            this.print("Congratulations! You solved the riddle.");
            return; // End here
        }
        else if (this.columnPointer === 0) {
            this.columnPointer = 6;
        }
         else if (this.columnPointer < 5) {
            this.columnPointer++;
        }
         else if (this.columnPointer === 5) {
            this.columnPointer = 0;
        } 
        
        this.start();
    }
    // You can add parsing logic here, e.g., commands, answers, etc.
  }

  print(text: string): void {
    this.outputElement.textContent += text + '\n';
  }

  clearOutput(): void {
    this.outputElement.textContent = '';
  }

  // TODO: Add more methods as needed, such as:
  // - saveGame()
  // - loadGame()
  // - handleUserInput()
  // - updateGameState()
  // - checkWinCondition()
}

// Start the game when the page loads
const game = new Game();
game.start();