#### color

**optional**, _string | string[] | Function_

Description: Configure the color. If there is no colorField configured, set one single color. Otherwise you can set a series of colors, or you can use callback function.

Default: The color board of the theme.

```ts
// set one single color
{
  color: '#a8ddb5'
}
// set a series of colors
{
  colorField: 'type', // or seriesField in some cases
  color: ['#d62728', '#2ca02c', '#000000'],
}
// Function
{
  colorField: 'type', // or seriesField in some cases
  color: (type) => {
    if(type === 'male'){
      return 'red';
    }
    // TODO
    return 'yellow';
  }
}
```
