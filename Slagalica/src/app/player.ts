export class Player {
  username: string;
  points: number;

  constructor(username: string, points: number){
    this.username = username;
    this.points = points;
  }

  addPoints(num: number) {
    this.points += num;
  }
}
