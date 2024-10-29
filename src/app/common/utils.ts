import { IdEntity } from "./entities";

export function shuffle(array: any[]): any[] {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array
}

export function getLastId(list: IdEntity[]): string {
  return list.length == 0 ? '0' : Math.max(...list.map(o => Number(o._id))) + 1 + ''
}
