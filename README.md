# route-map

NPM package for create a map of routes for easer support and refactoring

## Installation

TBD.

## Description

TBD.

## Examples

### Base usage

```typescript
/* @/routes.ts */
import createRoute from 'route-map';

const routes = {
  menu: createRoute('/menu'), // a static route without any variables
  category: createRoute<{ categoryId: string }>('/menu/{categoryId}'), // a route with variable
  item: createRoute<{ categoryId: string; itemId: number }>(
    '/menu/{categoryId}/{itemId}',
  ),
  cart: createRoute<{ back: string }>('/cart?back={back}', { back: '/' }), // second variable -- default variables
  randomPage: createRoute(() => getRandom(Object.keys(routes))), // a route with some specific logic
};

export default routes;

/* @/category.tsx */
import routes from '@/routes.ts';
...
const homeLink = route.index();
...
items.map((item: { id: number }) => routes.item({ categoryId: 'tv', itemId: item.id }));
...
```
