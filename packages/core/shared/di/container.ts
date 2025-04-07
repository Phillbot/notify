import "reflect-metadata";
import { Container } from "inversify";

export const coreContainer = new Container({
  defaultScope: "Singleton",
  skipBaseClassChecks: true,
});
