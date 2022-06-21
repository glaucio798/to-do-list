module.exports = {
  client: {
    name: 'ToDoList',
    includes: ['src/**/*.ts', 'src/**/*.tsx', 'src/graphql/client.graphql'],
    excludes: ['src/**/*.generated.ts', 'src/**/*.generated.tsx'],
    service: {
      name: 'toDoList',
      localSchemaFile: 'src/graphql/introspection.generated.json',
    },
  },
}
