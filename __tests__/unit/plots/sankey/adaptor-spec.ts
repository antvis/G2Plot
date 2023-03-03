import { Sankey } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('sankey adaptor', () => {
  const mockCallback = jest.fn();

  const DATA = [
    {
      sourceName: '低活',
      targetName: '低活2',
      sourceDisplayName: '低活',
      targetDisplayName: '低活',
      value: 1,
    },
    {
      sourceName: '低活',
      targetName: '中活2',
      sourceDisplayName: '低活',
      targetDisplayName: '中活',
      value: 1,
    },
    {
      sourceName: '低活',
      targetName: '高活2',
      sourceDisplayName: '低活',
      targetDisplayName: '高活',
      value: 1,
    },
    {
      sourceName: '中活',
      targetName: '低活2',
      sourceDisplayName: '中活',
      targetDisplayName: '低活',
      value: 1,
    },
    {
      sourceName: '中活',
      targetName: '中活2',
      sourceDisplayName: '中活',
      targetDisplayName: '中活',
      value: 1,
    },
    {
      sourceName: '中活',
      targetName: '流失2',
      sourceDisplayName: '中活',
      targetDisplayName: '流失',
      value: 1,
    },
    {
      sourceName: '高活',
      targetName: '低活2',
      sourceDisplayName: '高活',
      targetDisplayName: '低活',
      value: 1,
    },
    {
      sourceName: '高活',
      targetName: '高活2',
      sourceDisplayName: '高活',
      targetDisplayName: '高活',
      value: 1,
    },
    {
      sourceName: '沉默',
      targetName: '高活2',
      sourceDisplayName: '沉默',
      targetDisplayName: '高活',
      value: 1,
    },
    {
      sourceName: '沉默',
      targetName: '沉默2',
      sourceDisplayName: '沉默',
      targetDisplayName: '沉默',
      value: 1,
    },
    {
      sourceName: '流失',
      targetName: '沉默2',
      sourceDisplayName: '流失',
      targetDisplayName: '沉默',
      value: 1,
    },
    {
      sourceName: '流失',
      targetName: '流失2',
      sourceDisplayName: '流失',
      targetDisplayName: '流失',
      value: 1,
    },
    {
      sourceName: '低活2',
      targetName: '低活3',
      sourceDisplayName: '低活',
      targetDisplayName: '低活',
      value: 1,
    },
    {
      sourceName: '低活2',
      targetName: '中活3',
      sourceDisplayName: '低活',
      targetDisplayName: '中活',
      value: 1,
    },
    {
      sourceName: '低活2',
      targetName: '高活3',
      sourceDisplayName: '低活',
      targetDisplayName: '高活',
      value: 1,
    },
  ];

  const sankey = new Sankey(createDiv(), {
    height: 500,
    data: DATA,
    sourceField: 'sourceName',
    targetField: 'targetName',
    weightField: 'value',
    rawFields: ['sourceDisplayName', 'targetDisplayName'],
    edgeStyle: mockCallback,
  });

  sankey.render();

  it('edgeStyle callback', () => {
    expect(mockCallback.mock.calls[0][0].source).toBeDefined();
    expect(mockCallback.mock.calls[0][0].target).toBeDefined();
    expect(mockCallback.mock.calls[0][0].sourceDisplayName).toBeDefined();
    expect(mockCallback.mock.calls[0][0].targetDisplayName).toBeDefined();
  });
});
