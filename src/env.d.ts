/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    filter: import("./data/todos").TodoFilter;
  }
}
