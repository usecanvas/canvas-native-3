import Scanner    from '../../lib/scanner';
import { expect } from 'chai';

describe('Scanner', () => {
  it('iterates over lines in sets of 3', () => {
    const scanner = new Scanner([1, 2, 3]);

    let i = 0;
    const scanned = [];
    for (const [prev, current, next] of scanner) {
      scanned.push(current);

      if (i === 0) {
        expect(prev).to.be.null;
        expect(current).to.eq(1);
        expect(next).to.eq(2);
      } else if (i === 1) {
        expect(prev).to.eq  (1);
        expect(current).to.eq(2);
        expect(next).to.eq(3);
      } else {
        expect(prev).to.eq(2);
        expect(current).to.eq(3);
        expect(next).to.be.null;
      }

      i++;
    }

    expect(scanned).to.eql([1,2,3]);
  });
});
