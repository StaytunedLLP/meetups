import { sayHello } from "../src/hello";

describe("sayHello", () => {
  it("should return the correct greeting message", () => {
    const result = sayHello("World");
    expect(result).toBe("Hello World!");
  });

  it("should log the correct message to the console", () => {
    console.log = jest.fn();
    sayHello("World");
    expect(console.log).toHaveBeenCalledWith("Hello", "World");
  });
});
