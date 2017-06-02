import Symbol from 'es6-symbol';

import * as fake  from './fake'

export function by(rangeDate,interval, options = {exclusive: false, step: 1}) {// change
    const range = rangeDate;

    return {
        [Symbol.iterator]() {
            const exclusive = options.exclusive || false;
            const step = options.step || 1;
            const diff = Math.abs(fake.diff(range.start,range.end, interval)) / step;
            let iteration = 0;

            return {
                next() {
                    const current = fake.add(new Date(range.start.valueOf()),(iteration * step), interval);
                    console.log(current);
                    const done = exclusive
                        ? !(iteration < diff)
                        : !(iteration <= diff);

                    iteration++;

                    return {
                        done,
                        value: (done ? undefined : current)
                    };
                }
            };
        }
    };
}

export function byRange(rangeDate,interval, options = {exclusive: false, step: 1}) { //change
    const range = rangeDate;
    const step = options.step || 1;
    const diff = range.valueOf() / interval.valueOf() / step;
    const exclusive = options.exclusive || false;
    const unit = Math.floor(diff);
    let iteration = 0;

    return {
        [Symbol.iterator]() {
            if (unit === Infinity) {
                return {done: true};
            }

            return {
                next() {
                    const current = new Date(range.start.valueOf() + (interval.valueOf() * iteration * step));
                    const done = ((unit === diff) && exclusive)
                        ? !(iteration < unit)
                        : !(iteration <= unit);

                    iteration++;

                    return {
                        done,
                        value: (done ? undefined : current)
                    };
                }
            };
        }
    };
}

export function  reverseBy(interval, options = {exclusive: false, step: 1}) { // change fake
    const range = this;

    return {
        [Symbol.iterator]() {
            const exclusive = options.exclusive || false;
            const step = options.step || 1;
            const diff = Math.abs(fake.diff(range.start,range.end, interval)) / step;
            let iteration = 0;

            return {
                next() {
                    const current = fake.subtract(new Date(range.end.valueOf()),(iteration * step), interval);
                    const done = exclusive
                        ? !(iteration < diff)
                        : !(iteration <= diff);

                    iteration++;

                    return {
                        done,
                        value: (done ? undefined : current)
                    };
                }
            };
        }
    };
}
export function reverseByRange(rangeDate,interval, options = {exclusive: false, step: 1}) {  // change
    const range = rangeDate;
    const step = options.step || 1;
    const diff = rangeDate.valueOf() / interval.valueOf() / step;
    const exclusive = options.exclusive || false;
    const unit = Math.floor(diff);
    let iteration = 0;

    return {
        [Symbol.iterator]() {
            if (unit === Infinity) {
                return {done: true};
            }

            return {
                next() {
                    const current = new Date(range.end.valueOf() - (interval.valueOf() * iteration * step));
                    const done = ((unit === diff) && exclusive)
                        ? !(iteration < unit)
                        : !(iteration <= unit);

                    iteration++;

                    return {
                        done,
                        value: (done ? undefined : current)
                    };
                }
            };
        }
    };
}


/**


 */