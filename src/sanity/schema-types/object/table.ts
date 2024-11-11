export default {
  name: 'table',
  type: 'object',
  title: 'Table',
  fields: [
    {
      name: 'rows',
      type: 'array',
      title: 'Rows',
      of: [
        {
          type: 'object',
          name: 'row',
          fields: [
            {
              name: 'cells',
              type: 'array',
              title: 'Cells',
              of: [
                {
                  type: 'object',
                  name: 'cell',
                  fields: [
                    {
                      name: 'content',
                      type: 'array',
                      title: 'Content',
                      of: [{ type: 'block' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
