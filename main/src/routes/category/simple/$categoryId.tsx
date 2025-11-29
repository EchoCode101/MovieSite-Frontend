import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/category/simple/$categoryId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/category/simple/$categoryId"!</div>
}
