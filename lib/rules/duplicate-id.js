module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure that the same `id` isn't provided to the `useExpiry` hook multiple times",
      category: "Best Practices",
      recommended: false,
    },
    messages: {
      duplicateId: "Duplicate `id` '{{ id }}' found in `useExpiry`.",
    },
    schema: [],
  },
  create(context) {
    // Store the ids encountered in the file
    const idSet = new Set();

    return {
      // Reset the idSet for each new file
      Program() {
        idSet.clear();
      },

      CallExpression(node) {
        // Check if it's a call to `useExpiry`
        if (node.callee.name === "useExpiry" && node.arguments.length > 0) {
          const optionsArg = node.arguments[0];

          // Check if the argument is an object and has an `id` property
          if (optionsArg.type === "ObjectExpression") {
            const idProperty = optionsArg.properties.find(
              (prop) => prop.key && prop.key.name === "id"
            );

            // Check if we found an `id` property
            if (idProperty && idProperty.value.type === "Literal") {
              const idValue = idProperty.value.value;

              // Check if the `id` has already been used
              if (idSet.has(idValue)) {
                context.report({
                  node: idProperty,
                  messageId: "duplicateId",
                  data: {
                    id: idValue,
                  },
                });
              } else {
                // Add the `id` to the set of encountered ids
                idSet.add(idValue);
              }
            }
          }
        }
      },
    };
  },
};
