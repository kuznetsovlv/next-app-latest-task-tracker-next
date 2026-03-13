# React Patterns Lab

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

A learning project exploring modern React and Next.js patterns.

The project started as a simple task tracker and gradually evolved
into a playground for experimenting with rendering strategies,
React hooks, and server interactions.

## Tech Stack

- React 19
- Next.js (App Router)
- TypeScript
- SCSS modules
- ESLint + Prettier

## Topics explored

### Rendering strategies

- SSR – Server-Side Rendering
- SSG – Static Site Generation
- ISR – Incremental Static Regeneration
- Streaming with Suspense

### React patterns

- useTransition
- useDeferredValue
- useImperativeHandle
- optimistic UI
- Server Actions

### Tooling

- ESLint configuration
- Prettier integration
- project structure experiments

## Demo modules

The project contains several small demos:

- Task Tracker (server actions + optimistic UI)
- React Hooks playground

## Running locally

```bash
npm install
npm run dev
```

Then open: http://localhost:3000

## Project structure
```
src/app
├─ components
├─ hooks
├─ pages
└─ lib
```

## Experiments roadmap

- [x] SSR
- [x] ISR
- [x] Streaming
- [x] Server Actions
- [x] Optimistic UI
- [x] useTransition
- [x] useDeferredValue
- [x] useImperativeHandle
- [x] useOptimistic
- [ ] useActionState
- [ ] use
- [ ] Tailwind CSS

## License

This project is licensed under the MIT License.

See the [LICENSE](./LICENSE) file for details.