export class Utils {

  static mToKm(data: number) {
    if (data < 0 ) {
      return 0;
    }

    return parseFloat((data * 0.001).toFixed(2));
  }
}
