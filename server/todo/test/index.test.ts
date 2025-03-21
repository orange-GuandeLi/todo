import { describe, expect, it } from "bun:test"
import { Hono } from "hono"
import { todo } from "../router"
import { mockTodoModel, mockTodos } from "./model.mock"
import type { Todo } from "../type"

function toJSON(json: any) {
  return JSON.parse(JSON.stringify(json))
}

describe("Todo", () => {
  const app = new Hono().route("/", todo(mockTodoModel))

  it("should all todos", async () => {
    const res = await app.request("/")
    expect(res.ok).toBe(true)
    const json = await res.json()
    expect(json).toEqual(toJSON(mockTodos))
  })

  it("should create todo", async () => {
    const firstGetAll = await app.request("/")
    expect(firstGetAll.ok).toBe(true)
    const oldAll = await firstGetAll.json() as Todo[]

    const firstCreate = await app.request("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "test",
        description: "test",
      }),
    })
    expect(firstCreate.ok).toBe(true)
    const created = await firstCreate.json()
    expect(created).toEqual(toJSON(mockTodos[1]))
    
    const secondGetAll = await app.request("/")
    const newAll = await secondGetAll.json()
    expect(newAll).toEqual(toJSON([...oldAll, created]))
  })

  it("should delete todo", async () => {
    const firstGetAll = await app.request("/")
    expect(firstGetAll.ok).toBe(true)
    const oldAll = await firstGetAll.json() as Todo[]

    const firstDelete = await app.request("/2", {
      method: "DELETE",
    })
    expect(firstDelete.ok).toBe(true)
    const deleted = await firstDelete.json()
    expect(deleted).toEqual(oldAll[1])
    
    const secondGetAll = await app.request("/")
    const newAll = await secondGetAll.json()
    expect(newAll).toEqual(oldAll.filter(all => all.id != 2))
  })

  it("should delete todo error", async () => {
    const firstGetAll = await app.request("/")
    expect(firstGetAll.ok).toBe(true)
    const oldAll = await firstGetAll.json() as Todo[]

    try {
      await app.request("/2", {
        method: "DELETE",
      })
      throw new Error("should not be here")
    } catch (e) {
      expect(e instanceof Error).toBe(true)
      const secondGetAll = await app.request("/")
      expect(secondGetAll.ok).toBe(true)
      const newAll = await secondGetAll.json() as Todo[]
      expect(oldAll).toEqual(newAll)
    }
  })

  // ...
})