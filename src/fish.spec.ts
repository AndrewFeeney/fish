import { getColor } from "./fish"

describe('getColor function', () => {
  it('it should return the correct values for the inputs', () => {
    const testCases = [
      {
        input: {
          radius: 0,
          maxRadius: 50,
          height: 0,
          maxHeight: 500,
          velocity: 0,
        },
        expectedOutput: '#000000',
      },
      {
        input: {
          radius: 50,
          maxRadius: 50,
          height: 500,
          maxHeight: 500,
          velocity: 1,
        },
        expectedOutput: '#ffffff',
      },
    ]

    testCases.forEach(c => expect(
      getColor(
        c.input.radius,
        c.input.maxRadius,
        c.input.height,
        c.input.maxHeight,
        c.input.velocity
      )
    ).toEqual(c.expectedOutput))
  })
})
