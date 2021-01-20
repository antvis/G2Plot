<description>**optional** _object_</description>

Configure the meta of each data field of the chart in global, to define the type and presentation of data. Configuration of the meta will affect the text content of all components.

| Properties | Type       | Description                                              |
| ---------- | ---------- | -------------------------------------------------------- |
| alias      | _string_   | alias of the data field                                  |
| formatter  | _function_ | callback function to format all values of the data field |
| values     | _string[]_ | enumerate all the values of the data field               |
| range      | _number[]_ | mapping range of the data field, default: [0,1]          |

See also the [Meta Options](/en/docs/api/options/meta) to learn more about configuration of `meta`.
