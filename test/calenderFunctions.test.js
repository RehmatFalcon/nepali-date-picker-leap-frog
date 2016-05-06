describe("Test: calenderFunctions.getNepaliNumber(number)", function () {
    it("Should return equivalent nepali number", function () {
        expect(calenderFunctions.getNepaliNumber(2072)).toBe("२०७२");
        expect(calenderFunctions.getNepaliNumber(1234567890)).toBe("१२३४५६७८९०");
    });

    it("Throw error if parameter is not number OR negative number", function () {
        expect(function () {
            calenderFunctions.getNepaliNumber();
        }).toThrowError(Error, "Parameter number is required");

        expect(function () {
            calenderFunctions.getNepaliNumber('2072');
        }).toThrowError(Error, "Number should be positive integer");

        expect(function () {
            calenderFunctions.getNepaliNumber(-2072);
        }).toThrowError(Error, "Number should be positive integer");

        expect(function () {
            calenderFunctions.getNepaliNumber(2072);
        }).not.toThrow();
    });
});

describe("Test: calenderFunctions.getNumberByNepaliNumber(nepaliNumber)", function () {
    it("Should return equivalent number form NepaliNumber", function () {
        expect(calenderFunctions.getNumberByNepaliNumber("२०७२")).toEqual(2072);
        expect(calenderFunctions.getNumberByNepaliNumber("१२३४५६७८९०")).toEqual(1234567890);
    });

    it("Throw error if parameter not nepaliNumber in string", function () {
        expect(function () {
            calenderFunctions.getNumberByNepaliNumber();
        }).toThrowError(Error, "Parameter nepaliNumber is required");
        expect(function () {
            calenderFunctions.getNumberByNepaliNumber(1256);
        }).toThrowError(Error, "Parameter nepaliNumber should be in string");
        expect(function () {
            calenderFunctions.getNumberByNepaliNumber("२३D71");
        }).toThrowError(Error, "Invalid nepali number");
        expect(function () {
            calenderFunctions.getNumberByNepaliNumber("२०७२");
        }).not.toThrow();
    });
});

describe("Test: calenderFunctions.getBsMonthInfoByBsDate(bsYear, bsMonth, bsDate, dateFormatPattern)", function () {
    it("Should throw ReferenceError on not pass required parameters", function () {
        expect(
            function () {
                calenderFunctions.getBsMonthInfoByBsDate()
            }).toThrowError(ReferenceError, "Missing required parameters: bsYear, bsMonth, bsDate");
    });

    it("Should throw TypeError if bsYear not number", function () {
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate("2569", 2, 10, "y%, %M %D");
        }).toThrowError(TypeError, "Invalid parameter bsYear value");
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate(2072, 2, 10, "y%, %M %D");
        }).not.toThrow(TypeError, "Invalid parameter bsYear value");
    });

    it("Should throw TypeError if bsMonth not number", function () {
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate(2017, '2', 10, "y%, %M %D");
        }).toThrowError(TypeError, "Invalid parameter bsMonth value");
    });

    it("Should throw TypeError if bsDate not number", function () {
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate(2017, 2, '10', "y%, %M %D");
        }).toThrowError(TypeError, "Invalid parameter bsDate value");
    });

    it("Should throw RangeError if bsYear value out the supported range", function () {
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate(9000, 2, 10, "y%, %M %D");
        }).toThrowError(RangeError, "Parameter bsYear value should be in range of 2000 to 2090");
    });

    it("Should throw RangeError if bsMonth value not in range 0-11", function () {
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate(2072, 20, 10, "y%, %M %D");
        }).toThrowError(RangeError, "Parameter bsMonth value should be in range of 0 to 11");
    });

    it("Should throw RangeError if bsDate value not in range 1-32", function () {
        expect(function () {
            calenderFunctions.getBsMonthInfoByBsDate(2072, 10, 55, "y%, %M %D");
        }).toThrowError(RangeError, "Parameter bsDate value should be in range of 1 to 32");
    });

    it("Should return not empty object", function () {
        expect(calenderFunctions.getBsMonthInfoByBsDate(2072, 2, 10, "y%, %M %D")).toBeNonEmptyObject();
    });

    it("Should have key members [bsYear, bsMonth...]", function () {
        var bsMonthInfoByBsDate = calenderFunctions.getBsMonthInfoByBsDate(2072, 2, 10, "y%, %M %D");
        var availableKeys = Object.keys(bsMonthInfoByBsDate).sort();
        var expectedKeys = [
            'bsYear',
            'bsMonth',
            'bsDate',
            'weekDay',
            'formattedDate',
            'adDate',
            'bsMonthFirstAdDate',
            'bsMonthDays'
        ].sort();

        expect(bsMonthInfoByBsDate).toHaveMember("bsYear");
        expect(availableKeys).toEqual(expectedKeys);
    });

    it("Return value should equal", function () {
        expect(calenderFunctions.getBsMonthInfoByBsDate(2000, 1, 1, "%y, %M %D")).toEqual({
            bsYear: 2000,
            bsMonth: 1,
            bsDate: 1,
            weekDay: 5,
            formattedDate: '२०००, जेठ शुक्र',
            adDate: new Date(1943, 4, 14),
            bsMonthFirstAdDate: new Date(1943, 4, 14),
            bsMonthDays: 32
        });

        expect(calenderFunctions.getBsMonthInfoByBsDate(2072, 2, 10, "%y, %M %D")).toEqual({
            bsYear: 2072,
            bsMonth: 2,
            bsDate: 10,
            weekDay: 4,
            formattedDate: '२०७२, असार बिही',
            adDate: new Date(2015, 5, 25),
            bsMonthFirstAdDate: new Date(2015, 5, 16),
            bsMonthDays: 32
        });

        expect(calenderFunctions.getBsMonthInfoByBsDate(2090, 11, 30, "%D, %M %d, %y")).toEqual({
            bsYear: 2090,
            bsMonth: 11,
            bsDate: 30,
            weekDay: 5,
            formattedDate: 'बुध, चैत ३०, २०९०',
            adDate: new Date(2034, 3, 13),
            bsMonthFirstAdDate: new Date(2034, 2, 15),
            bsMonthDays: 30
        });
    })
});