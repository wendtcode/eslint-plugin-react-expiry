module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Flag `useExpiry` hook where `expires` attributes with past dates",
      category: "Possible Errors",
      recommended: false,
    },
    messages: {
      expiresPast: "The `expires` date is in the past: '{{ date }}'.",
    },
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        // Check if the call is to `useExpiry`
        if (node.callee.name !== "useExpiry") {
          return;
        }

        // Ensure the argument is an object with properties
        const options = node.arguments[0];
        if (options && options.type === "ObjectExpression") {
          const expiresProperty = options.properties.find(
            (prop) => prop.key.name === "expires"
          );

          if (expiresProperty) {
            const value = expiresProperty.value;

            // Ensure it's a new Date() expression
            if (
              value.type === "NewExpression" &&
              value.callee.name === "Date" &&
              value.arguments.length === 1 &&
              value.arguments[0].type === "Literal"
            ) {
              const dateArg = value.arguments[0].value;
              const date = new Date(dateArg);
              const now = new Date();

              // Check if the date is in the past
              if (!isNaN(date.getTime()) && date < now) {
                context.report({
                  node,
                  messageId: "expiresPast",
                  data: {
                    date: dateArg,
                  },
                });
              }
            }
          }
        }
      },
    };
  },
};
