import { Heatmap } from '../../src';
import { createDiv } from '../utils/dom';
import { wait } from '../utils/common';

const DATA = [
  {
    'Month of Year': 201601,
    District: 'Central/Western',
    AQHI: 3.341,
  },
  {
    'Month of Year': 201601,
    District: 'Eastern',
    AQHI: 3.266,
  },
  {
    'Month of Year': 201601,
    District: 'Kwun Tong',
    AQHI: 3.446,
  },
  {
    'Month of Year': 201601,
    District: 'Sham Shui Po',
    AQHI: 3.425,
  },
  {
    'Month of Year': 201601,
    District: 'Kwai Chung',
    AQHI: 3.415,
  },
  {
    'Month of Year': 201601,
    District: 'Tsuen Wan',
    AQHI: 3.379,
  },
  {
    'Month of Year': 201601,
    District: 'Tseung Kwan O',
    AQHI: 'NULL',
  },
  {
    'Month of Year': 201601,
    District: 'Yuen Long',
    AQHI: 3.022,
  },
  {
    'Month of Year': 201601,
    District: 'Tuen Mun',
    AQHI: 3.32,
  },
  {
    'Month of Year': 201601,
    District: 'Tung Chung',
    AQHI: 3.05,
  },
  {
    'Month of Year': 201601,
    District: 'Tai Po',
    AQHI: 2.95,
  },
  {
    'Month of Year': 201601,
    District: 'Sha Tin',
    AQHI: 3.164,
  },
  {
    'Month of Year': 201601,
    District: 'Tap Mun',
    AQHI: 'NULL',
  },
  {
    'Month of Year': 201601,
    District: 'Causeway Bay',
    AQHI: 3.975,
  },
  {
    'Month of Year': 201601,
    District: 'Central',
    AQHI: 3.507,
  },
  {
    'Month of Year': 201601,
    District: 'Mong Kok',
    AQHI: 3.591,
  },
  {
    'Month of Year': 201602,
    District: 'Central/Western',
    AQHI: 3.472,
  },
  {
    'Month of Year': 201602,
    District: 'Eastern',
    AQHI: 3.256,
  },
  {
    'Month of Year': 201602,
    District: 'Kwun Tong',
    AQHI: 3.721,
  },
  {
    'Month of Year': 201602,
    District: 'Sham Shui Po',
    AQHI: 3.47,
  },
  {
    'Month of Year': 201602,
    District: 'Kwai Chung',
    AQHI: 3.555,
  },
  {
    'Month of Year': 201602,
    District: 'Tsuen Wan',
    AQHI: 3.418,
  },
  {
    'Month of Year': 201602,
    District: 'Tseung Kwan O',
    AQHI: 'NULL',
  },
  {
    'Month of Year': 201602,
    District: 'Yuen Long',
    AQHI: 3.192,
  },
  {
    'Month of Year': 201602,
    District: 'Tuen Mun',
    AQHI: 3.407,
  },
  {
    'Month of Year': 201602,
    District: 'Tung Chung',
    AQHI: 3.048,
  },
  {
    'Month of Year': 201602,
    District: 'Tai Po',
    AQHI: 3.054,
  },
  {
    'Month of Year': 201602,
    District: 'Sha Tin',
    AQHI: 3.225,
  },
  {
    'Month of Year': 201602,
    District: 'Tap Mun',
    AQHI: 3.281,
  },
  {
    'Month of Year': 201602,
    District: 'Causeway Bay',
    AQHI: 4.185,
  },
  {
    'Month of Year': 201602,
    District: 'Central',
    AQHI: 3.776,
  },
  {
    'Month of Year': 201602,
    District: 'Mong Kok',
    AQHI: 3.707,
  },
  {
    'Month of Year': 201603,
    District: 'Central/Western',
    AQHI: 3.867,
  },
  {
    'Month of Year': 201603,
    District: 'Eastern',
    AQHI: 3.883,
  },
  {
    'Month of Year': 201603,
    District: 'Kwun Tong',
    AQHI: 3.965,
  },
  {
    'Month of Year': 201603,
    District: 'Sham Shui Po',
    AQHI: 3.92,
  },
  {
    'Month of Year': 201603,
    District: 'Kwai Chung',
    AQHI: 3.964,
  },
  {
    'Month of Year': 201603,
    District: 'Tsuen Wan',
    AQHI: 3.797,
  },
  {
    'Month of Year': 201603,
    District: 'Tseung Kwan O',
    AQHI: 3.839,
  },
  {
    'Month of Year': 201603,
    District: 'Yuen Long',
    AQHI: 3.405,
  },
  {
    'Month of Year': 201603,
    District: 'Tuen Mun',
    AQHI: 3.815,
  },
  {
    'Month of Year': 201603,
    District: 'Tung Chung',
    AQHI: 3.556,
  },
  {
    'Month of Year': 201603,
    District: 'Tai Po',
    AQHI: 3.32,
  },
  {
    'Month of Year': 201603,
    District: 'Sha Tin',
    AQHI: 3.557,
  },
  {
    'Month of Year': 201603,
    District: 'Tap Mun',
    AQHI: 3.442,
  },
  {
    'Month of Year': 201603,
    District: 'Causeway Bay',
    AQHI: 4.356,
  },
  {
    'Month of Year': 201603,
    District: 'Central',
    AQHI: 3.99,
  },
  {
    'Month of Year': 201603,
    District: 'Mong Kok',
    AQHI: 4.039,
  },
  {
    'Month of Year': 201604,
    District: 'Central/Western',
    AQHI: 3.247,
  },
  {
    'Month of Year': 201604,
    District: 'Eastern',
    AQHI: 3.804,
  },
  {
    'Month of Year': 201604,
    District: 'Kwun Tong',
    AQHI: 3.471,
  },
  {
    'Month of Year': 201604,
    District: 'Sham Shui Po',
    AQHI: 3.377,
  },
  {
    'Month of Year': 201604,
    District: 'Kwai Chung',
    AQHI: 3.616,
  },
  {
    'Month of Year': 201604,
    District: 'Tsuen Wan',
    AQHI: 3.441,
  },
  {
    'Month of Year': 201604,
    District: 'Tseung Kwan O',
    AQHI: 3.187,
  },
  {
    'Month of Year': 201604,
    District: 'Yuen Long',
    AQHI: 2.919,
  },
  {
    'Month of Year': 201604,
    District: 'Tuen Mun',
    AQHI: 3.476,
  },
  {
    'Month of Year': 201604,
    District: 'Tung Chung',
    AQHI: 2.997,
  },
  {
    'Month of Year': 201604,
    District: 'Tai Po',
    AQHI: 2.961,
  },
  {
    'Month of Year': 201604,
    District: 'Sha Tin',
    AQHI: 3.119,
  },
  {
    'Month of Year': 201604,
    District: 'Tap Mun',
    AQHI: 2.972,
  },
  {
    'Month of Year': 201604,
    District: 'Causeway Bay',
    AQHI: 3.845,
  },
  {
    'Month of Year': 201604,
    District: 'Central',
    AQHI: 3.493,
  },
  {
    'Month of Year': 201604,
    District: 'Mong Kok',
    AQHI: 3.565,
  },
  {
    'Month of Year': 201605,
    District: 'Central/Western',
    AQHI: 3.084,
  },
  {
    'Month of Year': 201605,
    District: 'Eastern',
    AQHI: 3.916,
  },
  {
    'Month of Year': 201605,
    District: 'Kwun Tong',
    AQHI: 3.559,
  },
  {
    'Month of Year': 201605,
    District: 'Sham Shui Po',
    AQHI: 3.305,
  },
  {
    'Month of Year': 201605,
    District: 'Kwai Chung',
    AQHI: 3.373,
  },
  {
    'Month of Year': 201605,
    District: 'Tsuen Wan',
    AQHI: 3.321,
  },
  {
    'Month of Year': 201605,
    District: 'Tseung Kwan O',
    AQHI: 3.333,
  },
  {
    'Month of Year': 201605,
    District: 'Yuen Long',
    AQHI: 2.996,
  },
  {
    'Month of Year': 201605,
    District: 'Tuen Mun',
    AQHI: 3.208,
  },
  {
    'Month of Year': 201605,
    District: 'Tung Chung',
    AQHI: 3.169,
  },
  {
    'Month of Year': 201605,
    District: 'Tai Po',
    AQHI: 3.034,
  },
  {
    'Month of Year': 201605,
    District: 'Sha Tin',
    AQHI: 3.155,
  },
  {
    'Month of Year': 201605,
    District: 'Tap Mun',
    AQHI: 3.286,
  },
  {
    'Month of Year': 201605,
    District: 'Causeway Bay',
    AQHI: 3.686,
  },
  {
    'Month of Year': 201605,
    District: 'Central',
    AQHI: 3.592,
  },
  {
    'Month of Year': 201605,
    District: 'Mong Kok',
    AQHI: 3.563,
  },
  {
    'Month of Year': 201606,
    District: 'Central/Western',
    AQHI: 2.316,
  },
  {
    'Month of Year': 201606,
    District: 'Eastern',
    AQHI: 2.704,
  },
  {
    'Month of Year': 201606,
    District: 'Kwun Tong',
    AQHI: 2.877,
  },
  {
    'Month of Year': 201606,
    District: 'Sham Shui Po',
    AQHI: 2.449,
  },
  {
    'Month of Year': 201606,
    District: 'Kwai Chung',
    AQHI: 2.708,
  },
  {
    'Month of Year': 201606,
    District: 'Tsuen Wan',
    AQHI: 2.467,
  },
  {
    'Month of Year': 201606,
    District: 'Tseung Kwan O',
    AQHI: 2.312,
  },
  {
    'Month of Year': 201606,
    District: 'Yuen Long',
    AQHI: 2.332,
  },
  {
    'Month of Year': 201606,
    District: 'Tuen Mun',
    AQHI: 2.417,
  },
  {
    'Month of Year': 201606,
    District: 'Tung Chung',
    AQHI: 2.252,
  },
  {
    'Month of Year': 201606,
    District: 'Tai Po',
    AQHI: 2.117,
  },
  {
    'Month of Year': 201606,
    District: 'Sha Tin',
    AQHI: 2.155,
  },
  {
    'Month of Year': 201606,
    District: 'Tap Mun',
    AQHI: 2.167,
  },
  {
    'Month of Year': 201606,
    District: 'Causeway Bay',
    AQHI: 3.081,
  },
  {
    'Month of Year': 201606,
    District: 'Central',
    AQHI: 2.728,
  },
  {
    'Month of Year': 201606,
    District: 'Mong Kok',
    AQHI: 2.624,
  },
  {
    'Month of Year': 201607,
    District: 'Central/Western',
    AQHI: 2.485,
  },
  {
    'Month of Year': 201607,
    District: 'Eastern',
    AQHI: 2.721,
  },
  {
    'Month of Year': 201607,
    District: 'Kwun Tong',
    AQHI: 3.2,
  },
  {
    'Month of Year': 201607,
    District: 'Sham Shui Po',
    AQHI: 2.68,
  },
  {
    'Month of Year': 201607,
    District: 'Kwai Chung',
    AQHI: 2.926,
  },
  {
    'Month of Year': 201607,
    District: 'Tsuen Wan',
    AQHI: 2.661,
  },
  {
    'Month of Year': 201607,
    District: 'Tseung Kwan O',
    AQHI: 2.554,
  },
  {
    'Month of Year': 201607,
    District: 'Yuen Long',
    AQHI: 2.674,
  },
  {
    'Month of Year': 201607,
    District: 'Tuen Mun',
    AQHI: 2.683,
  },
  {
    'Month of Year': 201607,
    District: 'Tung Chung',
    AQHI: 2.538,
  },
  {
    'Month of Year': 201607,
    District: 'Tai Po',
    AQHI: 2.468,
  },
  {
    'Month of Year': 201607,
    District: 'Sha Tin',
    AQHI: 2.461,
  },
  {
    'Month of Year': 201607,
    District: 'Tap Mun',
    AQHI: 2.51,
  },
  {
    'Month of Year': 201607,
    District: 'Causeway Bay',
    AQHI: 3.257,
  },
  {
    'Month of Year': 201607,
    District: 'Central',
    AQHI: 2.885,
  },
  {
    'Month of Year': 201607,
    District: 'Mong Kok',
    AQHI: 2.959,
  },
  {
    'Month of Year': 201608,
    District: 'Central/Western',
    AQHI: 3.16,
  },
  {
    'Month of Year': 201608,
    District: 'Eastern',
    AQHI: 3.395,
  },
  {
    'Month of Year': 201608,
    District: 'Kwun Tong',
    AQHI: 3.64,
  },
  {
    'Month of Year': 201608,
    District: 'Sham Shui Po',
    AQHI: 3.354,
  },
  {
    'Month of Year': 201608,
    District: 'Kwai Chung',
    AQHI: 3.477,
  },
  {
    'Month of Year': 201608,
    District: 'Tsuen Wan',
    AQHI: 3.292,
  },
  {
    'Month of Year': 201608,
    District: 'Tseung Kwan O',
    AQHI: 3.095,
  },
  {
    'Month of Year': 201608,
    District: 'Yuen Long',
    AQHI: 3.354,
  },
  {
    'Month of Year': 201608,
    District: 'Tuen Mun',
    AQHI: 3.428,
  },
  {
    'Month of Year': 201608,
    District: 'Tung Chung',
    AQHI: 2.996,
  },
  {
    'Month of Year': 201608,
    District: 'Tai Po',
    AQHI: 3.039,
  },
  {
    'Month of Year': 201608,
    District: 'Sha Tin',
    AQHI: 2.907,
  },
  {
    'Month of Year': 201608,
    District: 'Tap Mun',
    AQHI: 3.025,
  },
  {
    'Month of Year': 201608,
    District: 'Causeway Bay',
    AQHI: 3.819,
  },
  {
    'Month of Year': 201608,
    District: 'Central',
    AQHI: 3.418,
  },
  {
    'Month of Year': 201608,
    District: 'Mong Kok',
    AQHI: 3.441,
  },
  {
    'Month of Year': 201609,
    District: 'Central/Western',
    AQHI: 3.792,
  },
  {
    'Month of Year': 201609,
    District: 'Eastern',
    AQHI: 3.636,
  },
  {
    'Month of Year': 201609,
    District: 'Kwun Tong',
    AQHI: 4.008,
  },
  {
    'Month of Year': 201609,
    District: 'Sham Shui Po',
    AQHI: 3.739,
  },
  {
    'Month of Year': 201609,
    District: 'Kwai Chung',
    AQHI: 3.748,
  },
  {
    'Month of Year': 201609,
    District: 'Tsuen Wan',
    AQHI: 3.599,
  },
  {
    'Month of Year': 201609,
    District: 'Tseung Kwan O',
    AQHI: 3.519,
  },
  {
    'Month of Year': 201609,
    District: 'Yuen Long',
    AQHI: 3.743,
  },
  {
    'Month of Year': 201609,
    District: 'Tuen Mun',
    AQHI: 4.031,
  },
  {
    'Month of Year': 201609,
    District: 'Tung Chung',
    AQHI: 3.441,
  },
  {
    'Month of Year': 201609,
    District: 'Tai Po',
    AQHI: 3.324,
  },
  {
    'Month of Year': 201609,
    District: 'Sha Tin',
    AQHI: 3.281,
  },
  {
    'Month of Year': 201609,
    District: 'Tap Mun',
    AQHI: 3.522,
  },
  {
    'Month of Year': 201609,
    District: 'Causeway Bay',
    AQHI: 4.391,
  },
  {
    'Month of Year': 201609,
    District: 'Central',
    AQHI: 3.853,
  },
  {
    'Month of Year': 201609,
    District: 'Mong Kok',
    AQHI: 3.733,
  },
  {
    'Month of Year': 201610,
    District: 'Central/Western',
    AQHI: 3.116,
  },
  {
    'Month of Year': 201610,
    District: 'Eastern',
    AQHI: 3.186,
  },
  {
    'Month of Year': 201610,
    District: 'Kwun Tong',
    AQHI: 3.204,
  },
  {
    'Month of Year': 201610,
    District: 'Sham Shui Po',
    AQHI: 3.175,
  },
  {
    'Month of Year': 201610,
    District: 'Kwai Chung',
    AQHI: 3.13,
  },
  {
    'Month of Year': 201610,
    District: 'Tsuen Wan',
    AQHI: 3.045,
  },
  {
    'Month of Year': 201610,
    District: 'Tseung Kwan O',
    AQHI: 2.972,
  },
  {
    'Month of Year': 201610,
    District: 'Yuen Long',
    AQHI: 3.186,
  },
  {
    'Month of Year': 201610,
    District: 'Tuen Mun',
    AQHI: 3.312,
  },
  {
    'Month of Year': 201610,
    District: 'Tung Chung',
    AQHI: 2.717,
  },
  {
    'Month of Year': 201610,
    District: 'Tai Po',
    AQHI: 2.791,
  },
  {
    'Month of Year': 201610,
    District: 'Sha Tin',
    AQHI: 2.835,
  },
  {
    'Month of Year': 201610,
    District: 'Tap Mun',
    AQHI: 2.978,
  },
  {
    'Month of Year': 201610,
    District: 'Causeway Bay',
    AQHI: 3.409,
  },
  {
    'Month of Year': 201610,
    District: 'Central',
    AQHI: 3.216,
  },
  {
    'Month of Year': 201610,
    District: 'Mong Kok',
    AQHI: 3.206,
  },
  {
    'Month of Year': 201611,
    District: 'Central/Western',
    AQHI: 3.492,
  },
  {
    'Month of Year': 201611,
    District: 'Eastern',
    AQHI: 3.577,
  },
  {
    'Month of Year': 201611,
    District: 'Kwun Tong',
    AQHI: 3.627,
  },
  {
    'Month of Year': 201611,
    District: 'Sham Shui Po',
    AQHI: 3.517,
  },
  {
    'Month of Year': 201611,
    District: 'Kwai Chung',
    AQHI: 3.411,
  },
  {
    'Month of Year': 201611,
    District: 'Tsuen Wan',
    AQHI: 3.387,
  },
  {
    'Month of Year': 201611,
    District: 'Tseung Kwan O',
    AQHI: 3.363,
  },
  {
    'Month of Year': 201611,
    District: 'Yuen Long',
    AQHI: 3.477,
  },
  {
    'Month of Year': 201611,
    District: 'Tuen Mun',
    AQHI: 3.605,
  },
  {
    'Month of Year': 201611,
    District: 'Tung Chung',
    AQHI: 3.136,
  },
  {
    'Month of Year': 201611,
    District: 'Tai Po',
    AQHI: 3.104,
  },
  {
    'Month of Year': 201611,
    District: 'Sha Tin',
    AQHI: 3.155,
  },
  {
    'Month of Year': 201611,
    District: 'Tap Mun',
    AQHI: 3.364,
  },
  {
    'Month of Year': 201611,
    District: 'Causeway Bay',
    AQHI: 3.924,
  },
  {
    'Month of Year': 201611,
    District: 'Central',
    AQHI: 3.724,
  },
  {
    'Month of Year': 201611,
    District: 'Mong Kok',
    AQHI: 3.583,
  },
  {
    'Month of Year': 201612,
    District: 'Central/Western',
    AQHI: 4.262,
  },
  {
    'Month of Year': 201612,
    District: 'Eastern',
    AQHI: 4.376,
  },
  {
    'Month of Year': 201612,
    District: 'Kwun Tong',
    AQHI: 4.351,
  },
  {
    'Month of Year': 201612,
    District: 'Sham Shui Po',
    AQHI: 4.226,
  },
  {
    'Month of Year': 201612,
    District: 'Kwai Chung',
    AQHI: 4.181,
  },
  {
    'Month of Year': 201612,
    District: 'Tsuen Wan',
    AQHI: 4.24,
  },
  {
    'Month of Year': 201612,
    District: 'Tseung Kwan O',
    AQHI: 4.112,
  },
  {
    'Month of Year': 201612,
    District: 'Yuen Long',
    AQHI: 4.485,
  },
  {
    'Month of Year': 201612,
    District: 'Tuen Mun',
    AQHI: 4.575,
  },
  {
    'Month of Year': 201612,
    District: 'Tung Chung',
    AQHI: 4.027,
  },
  {
    'Month of Year': 201612,
    District: 'Tai Po',
    AQHI: 3.926,
  },
  {
    'Month of Year': 201612,
    District: 'Sha Tin',
    AQHI: 3.946,
  },
  {
    'Month of Year': 201612,
    District: 'Tap Mun',
    AQHI: 4.102,
  },
  {
    'Month of Year': 201612,
    District: 'Causeway Bay',
    AQHI: 4.652,
  },
  {
    'Month of Year': 201612,
    District: 'Central',
    AQHI: 4.71,
  },
  {
    'Month of Year': 201612,
    District: 'Mong Kok',
    AQHI: 4.31,
  },
  {
    'Month of Year': 201701,
    District: 'Central/Western',
    AQHI: 3.898,
  },
  {
    'Month of Year': 201701,
    District: 'Eastern',
    AQHI: 4.032,
  },
  {
    'Month of Year': 201701,
    District: 'Kwun Tong',
    AQHI: 3.832,
  },
  {
    'Month of Year': 201701,
    District: 'Sham Shui Po',
    AQHI: 3.874,
  },
  {
    'Month of Year': 201701,
    District: 'Kwai Chung',
    AQHI: 3.834,
  },
  {
    'Month of Year': 201701,
    District: 'Tsuen Wan',
    AQHI: 3.857,
  },
  {
    'Month of Year': 201701,
    District: 'Tseung Kwan O',
    AQHI: 3.73,
  },
  {
    'Month of Year': 201701,
    District: 'Yuen Long',
    AQHI: 3.815,
  },
  {
    'Month of Year': 201701,
    District: 'Tuen Mun',
    AQHI: 3.818,
  },
  {
    'Month of Year': 201701,
    District: 'Tung Chung',
    AQHI: 3.453,
  },
  {
    'Month of Year': 201701,
    District: 'Tai Po',
    AQHI: 3.693,
  },
  {
    'Month of Year': 201701,
    District: 'Sha Tin',
    AQHI: 3.671,
  },
  {
    'Month of Year': 201701,
    District: 'Tap Mun',
    AQHI: 3.641,
  },
  {
    'Month of Year': 201701,
    District: 'Causeway Bay',
    AQHI: 4.355,
  },
  {
    'Month of Year': 201701,
    District: 'Central',
    AQHI: 4.181,
  },
  {
    'Month of Year': 201701,
    District: 'Mong Kok',
    AQHI: 4.034,
  },
  {
    'Month of Year': 201702,
    District: 'Central/Western',
    AQHI: 3.867,
  },
  {
    'Month of Year': 201702,
    District: 'Eastern',
    AQHI: 4.057,
  },
  {
    'Month of Year': 201702,
    District: 'Kwun Tong',
    AQHI: 3.891,
  },
  {
    'Month of Year': 201702,
    District: 'Sham Shui Po',
    AQHI: 3.924,
  },
  {
    'Month of Year': 201702,
    District: 'Kwai Chung',
    AQHI: 3.859,
  },
  {
    'Month of Year': 201702,
    District: 'Tsuen Wan',
    AQHI: 3.864,
  },
  {
    'Month of Year': 201702,
    District: 'Tseung Kwan O',
    AQHI: 3.84,
  },
  {
    'Month of Year': 201702,
    District: 'Yuen Long',
    AQHI: 3.761,
  },
  {
    'Month of Year': 201702,
    District: 'Tuen Mun',
    AQHI: 3.694,
  },
  {
    'Month of Year': 201702,
    District: 'Tung Chung',
    AQHI: 3.33,
  },
  {
    'Month of Year': 201702,
    District: 'Tai Po',
    AQHI: 3.746,
  },
  {
    'Month of Year': 201702,
    District: 'Sha Tin',
    AQHI: 3.58,
  },
  {
    'Month of Year': 201702,
    District: 'Tap Mun',
    AQHI: 3.836,
  },
  {
    'Month of Year': 201702,
    District: 'Causeway Bay',
    AQHI: 4.356,
  },
  {
    'Month of Year': 201702,
    District: 'Central',
    AQHI: 4.217,
  },
  {
    'Month of Year': 201702,
    District: 'Mong Kok',
    AQHI: 4.03,
  },
  {
    'Month of Year': 201703,
    District: 'Central/Western',
    AQHI: 4.324,
  },
  {
    'Month of Year': 201703,
    District: 'Eastern',
    AQHI: 4.532,
  },
  {
    'Month of Year': 201703,
    District: 'Kwun Tong',
    AQHI: 4.123,
  },
  {
    'Month of Year': 201703,
    District: 'Sham Shui Po',
    AQHI: 4.163,
  },
  {
    'Month of Year': 201703,
    District: 'Kwai Chung',
    AQHI: 4.139,
  },
  {
    'Month of Year': 201703,
    District: 'Tsuen Wan',
    AQHI: 4.221,
  },
  {
    'Month of Year': 201703,
    District: 'Tseung Kwan O',
    AQHI: 4.316,
  },
  {
    'Month of Year': 201703,
    District: 'Yuen Long',
    AQHI: 3.877,
  },
  {
    'Month of Year': 201703,
    District: 'Tuen Mun',
    AQHI: 3.823,
  },
  {
    'Month of Year': 201703,
    District: 'Tung Chung',
    AQHI: 3.801,
  },
  {
    'Month of Year': 201703,
    District: 'Tai Po',
    AQHI: 4.163,
  },
  {
    'Month of Year': 201703,
    District: 'Sha Tin',
    AQHI: 3.945,
  },
  {
    'Month of Year': 201703,
    District: 'Tap Mun',
    AQHI: 4.095,
  },
  {
    'Month of Year': 201703,
    District: 'Causeway Bay',
    AQHI: 4.796,
  },
  {
    'Month of Year': 201703,
    District: 'Central',
    AQHI: 4.512,
  },
  {
    'Month of Year': 201703,
    District: 'Mong Kok',
    AQHI: 4.443,
  },
  {
    'Month of Year': 201704,
    District: 'Central/Western',
    AQHI: 3.696,
  },
  {
    'Month of Year': 201704,
    District: 'Eastern',
    AQHI: 3.964,
  },
  {
    'Month of Year': 201704,
    District: 'Kwun Tong',
    AQHI: 3.657,
  },
  {
    'Month of Year': 201704,
    District: 'Sham Shui Po',
    AQHI: 3.609,
  },
  {
    'Month of Year': 201704,
    District: 'Kwai Chung',
    AQHI: 3.591,
  },
  {
    'Month of Year': 201704,
    District: 'Tsuen Wan',
    AQHI: 3.579,
  },
  {
    'Month of Year': 201704,
    District: 'Tseung Kwan O',
    AQHI: 3.654,
  },
  {
    'Month of Year': 201704,
    District: 'Yuen Long',
    AQHI: 3.362,
  },
  {
    'Month of Year': 201704,
    District: 'Tuen Mun',
    AQHI: 3.371,
  },
  {
    'Month of Year': 201704,
    District: 'Tung Chung',
    AQHI: 3.362,
  },
  {
    'Month of Year': 201704,
    District: 'Tai Po',
    AQHI: 3.566,
  },
  {
    'Month of Year': 201704,
    District: 'Sha Tin',
    AQHI: 3.442,
  },
  {
    'Month of Year': 201704,
    District: 'Tap Mun',
    AQHI: 3.459,
  },
  {
    'Month of Year': 201704,
    District: 'Causeway Bay',
    AQHI: 4.279,
  },
  {
    'Month of Year': 201704,
    District: 'Central',
    AQHI: 3.84,
  },
  {
    'Month of Year': 201704,
    District: 'Mong Kok',
    AQHI: 3.831,
  },
  {
    'Month of Year': 201705,
    District: 'Central/Western',
    AQHI: 4.059,
  },
  {
    'Month of Year': 201705,
    District: 'Eastern',
    AQHI: 4.134,
  },
  {
    'Month of Year': 201705,
    District: 'Kwun Tong',
    AQHI: 3.821,
  },
  {
    'Month of Year': 201705,
    District: 'Sham Shui Po',
    AQHI: 3.935,
  },
  {
    'Month of Year': 201705,
    District: 'Kwai Chung',
    AQHI: 3.884,
  },
  {
    'Month of Year': 201705,
    District: 'Tsuen Wan',
    AQHI: 3.839,
  },
  {
    'Month of Year': 201705,
    District: 'Tseung Kwan O',
    AQHI: 3.928,
  },
  {
    'Month of Year': 201705,
    District: 'Yuen Long',
    AQHI: 3.761,
  },
  {
    'Month of Year': 201705,
    District: 'Tuen Mun',
    AQHI: 3.983,
  },
  {
    'Month of Year': 201705,
    District: 'Tung Chung',
    AQHI: 3.992,
  },
  {
    'Month of Year': 201705,
    District: 'Tai Po',
    AQHI: 3.788,
  },
  {
    'Month of Year': 201705,
    District: 'Sha Tin',
    AQHI: 3.702,
  },
  {
    'Month of Year': 201705,
    District: 'Tap Mun',
    AQHI: 3.643,
  },
  {
    'Month of Year': 201705,
    District: 'Causeway Bay',
    AQHI: 4.467,
  },
  {
    'Month of Year': 201705,
    District: 'Central',
    AQHI: 4.183,
  },
  {
    'Month of Year': 201705,
    District: 'Mong Kok',
    AQHI: 4.132,
  },
  {
    'Month of Year': 201706,
    District: 'Central/Western',
    AQHI: 2.173,
  },
  {
    'Month of Year': 201706,
    District: 'Eastern',
    AQHI: 2.42,
  },
  {
    'Month of Year': 201706,
    District: 'Kwun Tong',
    AQHI: 2.444,
  },
  {
    'Month of Year': 201706,
    District: 'Sham Shui Po',
    AQHI: 2.177,
  },
  {
    'Month of Year': 201706,
    District: 'Kwai Chung',
    AQHI: 2.565,
  },
  {
    'Month of Year': 201706,
    District: 'Tsuen Wan',
    AQHI: 2.224,
  },
  {
    'Month of Year': 201706,
    District: 'Tseung Kwan O',
    AQHI: 2.223,
  },
  {
    'Month of Year': 201706,
    District: 'Yuen Long',
    AQHI: 2.025,
  },
  {
    'Month of Year': 201706,
    District: 'Tuen Mun',
    AQHI: 2.136,
  },
  {
    'Month of Year': 201706,
    District: 'Tung Chung',
    AQHI: 2.116,
  },
  {
    'Month of Year': 201706,
    District: 'Tai Po',
    AQHI: 2.091,
  },
  {
    'Month of Year': 201706,
    District: 'Sha Tin',
    AQHI: 2.089,
  },
  {
    'Month of Year': 201706,
    District: 'Tap Mun',
    AQHI: 1.929,
  },
  {
    'Month of Year': 201706,
    District: 'Causeway Bay',
    AQHI: 3.143,
  },
  {
    'Month of Year': 201706,
    District: 'Central',
    AQHI: 2.485,
  },
  {
    'Month of Year': 201706,
    District: 'Mong Kok',
    AQHI: 2.508,
  },
  {
    'Month of Year': 201707,
    District: 'Central/Western',
    AQHI: 2.346,
  },
  {
    'Month of Year': 201707,
    District: 'Eastern',
    AQHI: 2.502,
  },
  {
    'Month of Year': 201707,
    District: 'Kwun Tong',
    AQHI: 2.413,
  },
  {
    'Month of Year': 201707,
    District: 'Sham Shui Po',
    AQHI: 2.332,
  },
  {
    'Month of Year': 201707,
    District: 'Kwai Chung',
    AQHI: 2.401,
  },
  {
    'Month of Year': 201707,
    District: 'Tsuen Wan',
    AQHI: 2.333,
  },
  {
    'Month of Year': 201707,
    District: 'Tseung Kwan O',
    AQHI: 2.368,
  },
  {
    'Month of Year': 201707,
    District: 'Yuen Long',
    AQHI: 2.25,
  },
  {
    'Month of Year': 201707,
    District: 'Tuen Mun',
    AQHI: 2.385,
  },
  {
    'Month of Year': 201707,
    District: 'Tung Chung',
    AQHI: 2.222,
  },
  {
    'Month of Year': 201707,
    District: 'Tai Po',
    AQHI: 2.328,
  },
  {
    'Month of Year': 201707,
    District: 'Sha Tin',
    AQHI: 2.217,
  },
  {
    'Month of Year': 201707,
    District: 'Tap Mun',
    AQHI: 2.178,
  },
  {
    'Month of Year': 201707,
    District: 'Causeway Bay',
    AQHI: 3.009,
  },
  {
    'Month of Year': 201707,
    District: 'Central',
    AQHI: 2.524,
  },
  {
    'Month of Year': 201707,
    District: 'Mong Kok',
    AQHI: 2.706,
  },
  {
    'Month of Year': 201708,
    District: 'Central/Western',
    AQHI: 2.653,
  },
  {
    'Month of Year': 201708,
    District: 'Eastern',
    AQHI: 2.759,
  },
  {
    'Month of Year': 201708,
    District: 'Kwun Tong',
    AQHI: 2.889,
  },
  {
    'Month of Year': 201708,
    District: 'Sham Shui Po',
    AQHI: 2.574,
  },
  {
    'Month of Year': 201708,
    District: 'Kwai Chung',
    AQHI: 2.889,
  },
  {
    'Month of Year': 201708,
    District: 'Tsuen Wan',
    AQHI: 2.665,
  },
  {
    'Month of Year': 201708,
    District: 'Tseung Kwan O',
    AQHI: 2.614,
  },
  {
    'Month of Year': 201708,
    District: 'Yuen Long',
    AQHI: 2.662,
  },
  {
    'Month of Year': 201708,
    District: 'Tuen Mun',
    AQHI: 2.826,
  },
  {
    'Month of Year': 201708,
    District: 'Tung Chung',
    AQHI: 2.45,
  },
  {
    'Month of Year': 201708,
    District: 'Tai Po',
    AQHI: 2.73,
  },
  {
    'Month of Year': 201708,
    District: 'Sha Tin',
    AQHI: 2.546,
  },
  {
    'Month of Year': 201708,
    District: 'Tap Mun',
    AQHI: 2.321,
  },
  {
    'Month of Year': 201708,
    District: 'Causeway Bay',
    AQHI: 3.403,
  },
  {
    'Month of Year': 201708,
    District: 'Central',
    AQHI: 2.854,
  },
  {
    'Month of Year': 201708,
    District: 'Mong Kok',
    AQHI: 3.013,
  },
  {
    'Month of Year': 201709,
    District: 'Central/Western',
    AQHI: 3.593,
  },
  {
    'Month of Year': 201709,
    District: 'Eastern',
    AQHI: 3.707,
  },
  {
    'Month of Year': 201709,
    District: 'Kwun Tong',
    AQHI: 3.618,
  },
  {
    'Month of Year': 201709,
    District: 'Sham Shui Po',
    AQHI: 3.503,
  },
  {
    'Month of Year': 201709,
    District: 'Kwai Chung',
    AQHI: 3.711,
  },
  {
    'Month of Year': 201709,
    District: 'Tsuen Wan',
    AQHI: 3.435,
  },
  {
    'Month of Year': 201709,
    District: 'Tseung Kwan O',
    AQHI: 3.495,
  },
  {
    'Month of Year': 201709,
    District: 'Yuen Long',
    AQHI: 3.303,
  },
  {
    'Month of Year': 201709,
    District: 'Tuen Mun',
    AQHI: 3.68,
  },
  {
    'Month of Year': 201709,
    District: 'Tung Chung',
    AQHI: 3.175,
  },
  {
    'Month of Year': 201709,
    District: 'Tai Po',
    AQHI: 3.545,
  },
  {
    'Month of Year': 201709,
    District: 'Sha Tin',
    AQHI: 3.361,
  },
  {
    'Month of Year': 201709,
    District: 'Tap Mun',
    AQHI: 3.158,
  },
  {
    'Month of Year': 201709,
    District: 'Causeway Bay',
    AQHI: 4.316,
  },
  {
    'Month of Year': 201709,
    District: 'Central',
    AQHI: 3.707,
  },
  {
    'Month of Year': 201709,
    District: 'Mong Kok',
    AQHI: 3.951,
  },
  {
    'Month of Year': 201710,
    District: 'Central/Western',
    AQHI: 4.021,
  },
  {
    'Month of Year': 201710,
    District: 'Eastern',
    AQHI: 4.055,
  },
  {
    'Month of Year': 201710,
    District: 'Kwun Tong',
    AQHI: 3.961,
  },
  {
    'Month of Year': 201710,
    District: 'Sham Shui Po',
    AQHI: 3.885,
  },
  {
    'Month of Year': 201710,
    District: 'Kwai Chung',
    AQHI: 4.026,
  },
  {
    'Month of Year': 201710,
    District: 'Tsuen Wan',
    AQHI: 3.914,
  },
  {
    'Month of Year': 201710,
    District: 'Tseung Kwan O',
    AQHI: 4.012,
  },
  {
    'Month of Year': 201710,
    District: 'Yuen Long',
    AQHI: 3.988,
  },
  {
    'Month of Year': 201710,
    District: 'Tuen Mun',
    AQHI: 4.223,
  },
  {
    'Month of Year': 201710,
    District: 'Tung Chung',
    AQHI: 3.668,
  },
  {
    'Month of Year': 201710,
    District: 'Tai Po',
    AQHI: 3.919,
  },
  {
    'Month of Year': 201710,
    District: 'Sha Tin',
    AQHI: 3.845,
  },
  {
    'Month of Year': 201710,
    District: 'Tap Mun',
    AQHI: 4.16,
  },
  {
    'Month of Year': 201710,
    District: 'Causeway Bay',
    AQHI: 4.417,
  },
  {
    'Month of Year': 201710,
    District: 'Central',
    AQHI: 4.026,
  },
  {
    'Month of Year': 201710,
    District: 'Mong Kok',
    AQHI: 4.116,
  },
  {
    'Month of Year': 201711,
    District: 'Central/Western',
    AQHI: 3.872,
  },
  {
    'Month of Year': 201711,
    District: 'Eastern',
    AQHI: 4.017,
  },
  {
    'Month of Year': 201711,
    District: 'Kwun Tong',
    AQHI: 3.792,
  },
  {
    'Month of Year': 201711,
    District: 'Sham Shui Po',
    AQHI: 3.701,
  },
  {
    'Month of Year': 201711,
    District: 'Kwai Chung',
    AQHI: 3.78,
  },
  {
    'Month of Year': 201711,
    District: 'Tsuen Wan',
    AQHI: 3.759,
  },
  {
    'Month of Year': 201711,
    District: 'Tseung Kwan O',
    AQHI: 3.867,
  },
  {
    'Month of Year': 201711,
    District: 'Yuen Long',
    AQHI: 3.889,
  },
  {
    'Month of Year': 201711,
    District: 'Tuen Mun',
    AQHI: 4.123,
  },
  {
    'Month of Year': 201711,
    District: 'Tung Chung',
    AQHI: 3.636,
  },
  {
    'Month of Year': 201711,
    District: 'Tai Po',
    AQHI: 3.827,
  },
  {
    'Month of Year': 201711,
    District: 'Sha Tin',
    AQHI: 3.672,
  },
  {
    'Month of Year': 201711,
    District: 'Tap Mun',
    AQHI: 3.715,
  },
  {
    'Month of Year': 201711,
    District: 'Causeway Bay',
    AQHI: 4.348,
  },
  {
    'Month of Year': 201711,
    District: 'Central',
    AQHI: 3.989,
  },
  {
    'Month of Year': 201711,
    District: 'Mong Kok',
    AQHI: 4.027,
  },
  {
    'Month of Year': 201712,
    District: 'Central/Western',
    AQHI: 4.413,
  },
  {
    'Month of Year': 201712,
    District: 'Eastern',
    AQHI: 4.535,
  },
  {
    'Month of Year': 201712,
    District: 'Kwun Tong',
    AQHI: 4.408,
  },
  {
    'Month of Year': 201712,
    District: 'Sham Shui Po',
    AQHI: 4.25,
  },
  {
    'Month of Year': 201712,
    District: 'Kwai Chung',
    AQHI: 4.511,
  },
  {
    'Month of Year': 201712,
    District: 'Tsuen Wan',
    AQHI: 4.472,
  },
  {
    'Month of Year': 201712,
    District: 'Tseung Kwan O',
    AQHI: 4.312,
  },
  {
    'Month of Year': 201712,
    District: 'Yuen Long',
    AQHI: 4.546,
  },
  {
    'Month of Year': 201712,
    District: 'Tuen Mun',
    AQHI: 4.814,
  },
  {
    'Month of Year': 201712,
    District: 'Tung Chung',
    AQHI: 4.277,
  },
  {
    'Month of Year': 201712,
    District: 'Tai Po',
    AQHI: 4.49,
  },
  {
    'Month of Year': 201712,
    District: 'Sha Tin',
    AQHI: 4.391,
  },
  {
    'Month of Year': 201712,
    District: 'Tap Mun',
    AQHI: 4.388,
  },
  {
    'Month of Year': 201712,
    District: 'Causeway Bay',
    AQHI: 5.046,
  },
  {
    'Month of Year': 201712,
    District: 'Central',
    AQHI: 4.732,
  },
  {
    'Month of Year': 201712,
    District: 'Mong Kok',
    AQHI: 4.646,
  },
  {
    'Month of Year': 201801,
    District: 'Central/Western',
    AQHI: 3.748,
  },
  {
    'Month of Year': 201801,
    District: 'Eastern',
    AQHI: 3.886,
  },
  {
    'Month of Year': 201801,
    District: 'Kwun Tong',
    AQHI: 3.863,
  },
  {
    'Month of Year': 201801,
    District: 'Sham Shui Po',
    AQHI: 3.552,
  },
  {
    'Month of Year': 201801,
    District: 'Kwai Chung',
    AQHI: 3.772,
  },
  {
    'Month of Year': 201801,
    District: 'Tsuen Wan',
    AQHI: 3.862,
  },
  {
    'Month of Year': 201801,
    District: 'Tseung Kwan O',
    AQHI: 3.724,
  },
  {
    'Month of Year': 201801,
    District: 'Yuen Long',
    AQHI: 3.686,
  },
  {
    'Month of Year': 201801,
    District: 'Tuen Mun',
    AQHI: 3.959,
  },
  {
    'Month of Year': 201801,
    District: 'Tung Chung',
    AQHI: 3.455,
  },
  {
    'Month of Year': 201801,
    District: 'Tai Po',
    AQHI: 3.752,
  },
  {
    'Month of Year': 201801,
    District: 'Sha Tin',
    AQHI: 3.659,
  },
  {
    'Month of Year': 201801,
    District: 'Tap Mun',
    AQHI: 3.635,
  },
  {
    'Month of Year': 201801,
    District: 'Causeway Bay',
    AQHI: 4.348,
  },
  {
    'Month of Year': 201801,
    District: 'Central',
    AQHI: 4.053,
  },
  {
    'Month of Year': 201801,
    District: 'Mong Kok',
    AQHI: 4.063,
  },
  {
    'Month of Year': 201802,
    District: 'Central/Western',
    AQHI: 3.926,
  },
  {
    'Month of Year': 201802,
    District: 'Eastern',
    AQHI: 4.177,
  },
  {
    'Month of Year': 201802,
    District: 'Kwun Tong',
    AQHI: 4.137,
  },
  {
    'Month of Year': 201802,
    District: 'Sham Shui Po',
    AQHI: 3.626,
  },
  {
    'Month of Year': 201802,
    District: 'Kwai Chung',
    AQHI: 3.84,
  },
  {
    'Month of Year': 201802,
    District: 'Tsuen Wan',
    AQHI: 3.896,
  },
  {
    'Month of Year': 201802,
    District: 'Tseung Kwan O',
    AQHI: 3.709,
  },
  {
    'Month of Year': 201802,
    District: 'Yuen Long',
    AQHI: 3.664,
  },
  {
    'Month of Year': 201802,
    District: 'Tuen Mun',
    AQHI: 3.923,
  },
  {
    'Month of Year': 201802,
    District: 'Tung Chung',
    AQHI: 3.303,
  },
  {
    'Month of Year': 201802,
    District: 'Tai Po',
    AQHI: 3.836,
  },
  {
    'Month of Year': 201802,
    District: 'Sha Tin',
    AQHI: 3.813,
  },
  {
    'Month of Year': 201802,
    District: 'Tap Mun',
    AQHI: 3.72,
  },
  {
    'Month of Year': 201802,
    District: 'Causeway Bay',
    AQHI: 4.461,
  },
  {
    'Month of Year': 201802,
    District: 'Central',
    AQHI: 4.207,
  },
  {
    'Month of Year': 201802,
    District: 'Mong Kok',
    AQHI: 4.194,
  },
  {
    'Month of Year': 201803,
    District: 'Central/Western',
    AQHI: 4.155,
  },
  {
    'Month of Year': 201803,
    District: 'Eastern',
    AQHI: 4.33,
  },
  {
    'Month of Year': 201803,
    District: 'Kwun Tong',
    AQHI: 4.156,
  },
  {
    'Month of Year': 201803,
    District: 'Sham Shui Po',
    AQHI: 3.987,
  },
  {
    'Month of Year': 201803,
    District: 'Kwai Chung',
    AQHI: 4.034,
  },
  {
    'Month of Year': 201803,
    District: 'Tsuen Wan',
    AQHI: 3.86,
  },
  {
    'Month of Year': 201803,
    District: 'Tseung Kwan O',
    AQHI: 3.991,
  },
  {
    'Month of Year': 201803,
    District: 'Yuen Long',
    AQHI: 3.649,
  },
  {
    'Month of Year': 201803,
    District: 'Tuen Mun',
    AQHI: 3.826,
  },
  {
    'Month of Year': 201803,
    District: 'Tung Chung',
    AQHI: 3.296,
  },
  {
    'Month of Year': 201803,
    District: 'Tai Po',
    AQHI: 3.897,
  },
  {
    'Month of Year': 201803,
    District: 'Sha Tin',
    AQHI: 3.767,
  },
  {
    'Month of Year': 201803,
    District: 'Tap Mun',
    AQHI: 3.618,
  },
  {
    'Month of Year': 201803,
    District: 'Causeway Bay',
    AQHI: 4.669,
  },
  {
    'Month of Year': 201803,
    District: 'Central',
    AQHI: 4.257,
  },
  {
    'Month of Year': 201803,
    District: 'Mong Kok',
    AQHI: 4.336,
  },
  {
    'Month of Year': 201804,
    District: 'Central/Western',
    AQHI: 3.673,
  },
  {
    'Month of Year': 201804,
    District: 'Eastern',
    AQHI: 4.037,
  },
  {
    'Month of Year': 201804,
    District: 'Kwun Tong',
    AQHI: 3.911,
  },
  {
    'Month of Year': 201804,
    District: 'Sham Shui Po',
    AQHI: 3.684,
  },
  {
    'Month of Year': 201804,
    District: 'Kwai Chung',
    AQHI: 3.844,
  },
  {
    'Month of Year': 201804,
    District: 'Tsuen Wan',
    AQHI: 3.571,
  },
  {
    'Month of Year': 201804,
    District: 'Tseung Kwan O',
    AQHI: 3.851,
  },
  {
    'Month of Year': 201804,
    District: 'Yuen Long',
    AQHI: 3.497,
  },
  {
    'Month of Year': 201804,
    District: 'Tuen Mun',
    AQHI: 3.8,
  },
  {
    'Month of Year': 201804,
    District: 'Tung Chung',
    AQHI: 3.144,
  },
  {
    'Month of Year': 201804,
    District: 'Tai Po',
    AQHI: 3.341,
  },
  {
    'Month of Year': 201804,
    District: 'Sha Tin',
    AQHI: 3.691,
  },
  {
    'Month of Year': 201804,
    District: 'Tap Mun',
    AQHI: 3.716,
  },
  {
    'Month of Year': 201804,
    District: 'Causeway Bay',
    AQHI: 4.289,
  },
  {
    'Month of Year': 201804,
    District: 'Central',
    AQHI: 3.383,
  },
  {
    'Month of Year': 201804,
    District: 'Mong Kok',
    AQHI: 3.992,
  },
  {
    'Month of Year': 201805,
    District: 'Central/Western',
    AQHI: 2.772,
  },
  {
    'Month of Year': 201805,
    District: 'Eastern',
    AQHI: 3.032,
  },
  {
    'Month of Year': 201805,
    District: 'Kwun Tong',
    AQHI: 3.15,
  },
  {
    'Month of Year': 201805,
    District: 'Sham Shui Po',
    AQHI: 2.839,
  },
  {
    'Month of Year': 201805,
    District: 'Kwai Chung',
    AQHI: 3.125,
  },
  {
    'Month of Year': 201805,
    District: 'Tsuen Wan',
    AQHI: 2.681,
  },
  {
    'Month of Year': 201805,
    District: 'Tseung Kwan O',
    AQHI: 2.935,
  },
  {
    'Month of Year': 201805,
    District: 'Yuen Long',
    AQHI: 2.905,
  },
  {
    'Month of Year': 201805,
    District: 'Tuen Mun',
    AQHI: 2.979,
  },
  {
    'Month of Year': 201805,
    District: 'Tung Chung',
    AQHI: 2.653,
  },
  {
    'Month of Year': 201805,
    District: 'Tai Po',
    AQHI: 2.386,
  },
  {
    'Month of Year': 201805,
    District: 'Sha Tin',
    AQHI: 2.884,
  },
  {
    'Month of Year': 201805,
    District: 'Tap Mun',
    AQHI: 2.804,
  },
  {
    'Month of Year': 201805,
    District: 'Causeway Bay',
    AQHI: 3.423,
  },
  {
    'Month of Year': 201805,
    District: 'Central',
    AQHI: 2.902,
  },
  {
    'Month of Year': 201805,
    District: 'Mong Kok',
    AQHI: 3.222,
  },
  {
    'Month of Year': 201806,
    District: 'Central/Western',
    AQHI: 3.049,
  },
  {
    'Month of Year': 201806,
    District: 'Eastern',
    AQHI: 3.388,
  },
  {
    'Month of Year': 201806,
    District: 'Kwun Tong',
    AQHI: 3.224,
  },
  {
    'Month of Year': 201806,
    District: 'Sham Shui Po',
    AQHI: 3.072,
  },
  {
    'Month of Year': 201806,
    District: 'Kwai Chung',
    AQHI: 3.235,
  },
  {
    'Month of Year': 201806,
    District: 'Tsuen Wan',
    AQHI: 2.82,
  },
  {
    'Month of Year': 201806,
    District: 'Tseung Kwan O',
    AQHI: 3.104,
  },
  {
    'Month of Year': 201806,
    District: 'Yuen Long',
    AQHI: 3.04,
  },
  {
    'Month of Year': 201806,
    District: 'Tuen Mun',
    AQHI: 3.209,
  },
  {
    'Month of Year': 201806,
    District: 'Tung Chung',
    AQHI: 2.963,
  },
  {
    'Month of Year': 201806,
    District: 'Tai Po',
    AQHI: 2.509,
  },
  {
    'Month of Year': 201806,
    District: 'Sha Tin',
    AQHI: 3.105,
  },
  {
    'Month of Year': 201806,
    District: 'Tap Mun',
    AQHI: 2.954,
  },
  {
    'Month of Year': 201806,
    District: 'Causeway Bay',
    AQHI: 3.559,
  },
  {
    'Month of Year': 201806,
    District: 'Central',
    AQHI: 3.424,
  },
  {
    'Month of Year': 201806,
    District: 'Mong Kok',
    AQHI: 3.264,
  },
  {
    'Month of Year': 201807,
    District: 'Central/Western',
    AQHI: 2.237,
  },
  {
    'Month of Year': 201807,
    District: 'Eastern',
    AQHI: 2.467,
  },
  {
    'Month of Year': 201807,
    District: 'Kwun Tong',
    AQHI: 2.507,
  },
  {
    'Month of Year': 201807,
    District: 'Sham Shui Po',
    AQHI: 2.337,
  },
  {
    'Month of Year': 201807,
    District: 'Kwai Chung',
    AQHI: 2.446,
  },
  {
    'Month of Year': 201807,
    District: 'Tsuen Wan',
    AQHI: 2.139,
  },
  {
    'Month of Year': 201807,
    District: 'Tseung Kwan O',
    AQHI: 2.308,
  },
  {
    'Month of Year': 201807,
    District: 'Yuen Long',
    AQHI: 2.244,
  },
  {
    'Month of Year': 201807,
    District: 'Tuen Mun',
    AQHI: 2.403,
  },
  {
    'Month of Year': 201807,
    District: 'Tung Chung',
    AQHI: 2.214,
  },
  {
    'Month of Year': 201807,
    District: 'Tai Po',
    AQHI: 2.259,
  },
  {
    'Month of Year': 201807,
    District: 'Sha Tin',
    AQHI: 2.419,
  },
  {
    'Month of Year': 201807,
    District: 'Tap Mun',
    AQHI: 2.169,
  },
  {
    'Month of Year': 201807,
    District: 'Causeway Bay',
    AQHI: 2.834,
  },
  {
    'Month of Year': 201807,
    District: 'Central',
    AQHI: 2.524,
  },
  {
    'Month of Year': 201807,
    District: 'Mong Kok',
    AQHI: 2.599,
  },
  {
    'Month of Year': 201808,
    District: 'Central/Western',
    AQHI: 3.154,
  },
  {
    'Month of Year': 201808,
    District: 'Eastern',
    AQHI: 3.271,
  },
  {
    'Month of Year': 201808,
    District: 'Kwun Tong',
    AQHI: 3.301,
  },
  {
    'Month of Year': 201808,
    District: 'Sham Shui Po',
    AQHI: 3.209,
  },
  {
    'Month of Year': 201808,
    District: 'Kwai Chung',
    AQHI: 3.249,
  },
  {
    'Month of Year': 201808,
    District: 'Tsuen Wan',
    AQHI: 3.043,
  },
  {
    'Month of Year': 201808,
    District: 'Tseung Kwan O',
    AQHI: 3.143,
  },
  {
    'Month of Year': 201808,
    District: 'Yuen Long',
    AQHI: 3.163,
  },
  {
    'Month of Year': 201808,
    District: 'Tuen Mun',
    AQHI: 3.323,
  },
  {
    'Month of Year': 201808,
    District: 'Tung Chung',
    AQHI: 3.072,
  },
  {
    'Month of Year': 201808,
    District: 'Tai Po',
    AQHI: 3.147,
  },
  {
    'Month of Year': 201808,
    District: 'Sha Tin',
    AQHI: 3.133,
  },
  {
    'Month of Year': 201808,
    District: 'Tap Mun',
    AQHI: 2.967,
  },
  {
    'Month of Year': 201808,
    District: 'Causeway Bay',
    AQHI: 3.728,
  },
  {
    'Month of Year': 201808,
    District: 'Central',
    AQHI: 3.559,
  },
  {
    'Month of Year': 201808,
    District: 'Mong Kok',
    AQHI: 3.595,
  },
  {
    'Month of Year': 201809,
    District: 'Central/Western',
    AQHI: 3.423,
  },
  {
    'Month of Year': 201809,
    District: 'Eastern',
    AQHI: 3.483,
  },
  {
    'Month of Year': 201809,
    District: 'Kwun Tong',
    AQHI: 3.361,
  },
  {
    'Month of Year': 201809,
    District: 'Sham Shui Po',
    AQHI: 3.385,
  },
  {
    'Month of Year': 201809,
    District: 'Kwai Chung',
    AQHI: 3.4,
  },
  {
    'Month of Year': 201809,
    District: 'Tsuen Wan',
    AQHI: 3.155,
  },
  {
    'Month of Year': 201809,
    District: 'Tseung Kwan O',
    AQHI: 3.385,
  },
  {
    'Month of Year': 201809,
    District: 'Yuen Long',
    AQHI: 3.407,
  },
  {
    'Month of Year': 201809,
    District: 'Tuen Mun',
    AQHI: 3.677,
  },
  {
    'Month of Year': 201809,
    District: 'Tung Chung',
    AQHI: 3.243,
  },
  {
    'Month of Year': 201809,
    District: 'Tai Po',
    AQHI: 3.273,
  },
  {
    'Month of Year': 201809,
    District: 'Sha Tin',
    AQHI: 3.38,
  },
  {
    'Month of Year': 201809,
    District: 'Tap Mun',
    AQHI: 2.952,
  },
  {
    'Month of Year': 201809,
    District: 'Causeway Bay',
    AQHI: 3.873,
  },
  {
    'Month of Year': 201809,
    District: 'Central',
    AQHI: 3.725,
  },
  {
    'Month of Year': 201809,
    District: 'Mong Kok',
    AQHI: 3.727,
  },
  {
    'Month of Year': 201810,
    District: 'Central/Western',
    AQHI: 4.788,
  },
  {
    'Month of Year': 201810,
    District: 'Eastern',
    AQHI: 4.826,
  },
  {
    'Month of Year': 201810,
    District: 'Kwun Tong',
    AQHI: 4.568,
  },
  {
    'Month of Year': 201810,
    District: 'Sham Shui Po',
    AQHI: 4.751,
  },
  {
    'Month of Year': 201810,
    District: 'Kwai Chung',
    AQHI: 4.631,
  },
  {
    'Month of Year': 201810,
    District: 'Tsuen Wan',
    AQHI: 4.47,
  },
  {
    'Month of Year': 201810,
    District: 'Tseung Kwan O',
    AQHI: 4.73,
  },
  {
    'Month of Year': 201810,
    District: 'Yuen Long',
    AQHI: 4.488,
  },
  {
    'Month of Year': 201810,
    District: 'Tuen Mun',
    AQHI: 4.956,
  },
  {
    'Month of Year': 201810,
    District: 'Tung Chung',
    AQHI: 4.392,
  },
  {
    'Month of Year': 201810,
    District: 'Tai Po',
    AQHI: 4.476,
  },
  {
    'Month of Year': 201810,
    District: 'Sha Tin',
    AQHI: 4.658,
  },
  {
    'Month of Year': 201810,
    District: 'Tap Mun',
    AQHI: 4.595,
  },
  {
    'Month of Year': 201810,
    District: 'Causeway Bay',
    AQHI: 4.947,
  },
  {
    'Month of Year': 201810,
    District: 'Central',
    AQHI: 5.003,
  },
  {
    'Month of Year': 201810,
    District: 'Mong Kok',
    AQHI: 4.917,
  },
  {
    'Month of Year': 201811,
    District: 'Central/Western',
    AQHI: 3.865,
  },
  {
    'Month of Year': 201811,
    District: 'Eastern',
    AQHI: 3.767,
  },
  {
    'Month of Year': 201811,
    District: 'Kwun Tong',
    AQHI: 3.78,
  },
  {
    'Month of Year': 201811,
    District: 'Sham Shui Po',
    AQHI: 3.717,
  },
  {
    'Month of Year': 201811,
    District: 'Kwai Chung',
    AQHI: 3.733,
  },
  {
    'Month of Year': 201811,
    District: 'Tsuen Wan',
    AQHI: 3.676,
  },
  {
    'Month of Year': 201811,
    District: 'Tseung Kwan O',
    AQHI: 3.872,
  },
  {
    'Month of Year': 201811,
    District: 'Yuen Long',
    AQHI: 3.721,
  },
  {
    'Month of Year': 201811,
    District: 'Tuen Mun',
    AQHI: 3.945,
  },
  {
    'Month of Year': 201811,
    District: 'Tung Chung',
    AQHI: 3.461,
  },
  {
    'Month of Year': 201811,
    District: 'Tai Po',
    AQHI: 3.701,
  },
  {
    'Month of Year': 201811,
    District: 'Sha Tin',
    AQHI: 3.825,
  },
  {
    'Month of Year': 201811,
    District: 'Tap Mun',
    AQHI: 3.653,
  },
  {
    'Month of Year': 201811,
    District: 'Causeway Bay',
    AQHI: 4.003,
  },
  {
    'Month of Year': 201811,
    District: 'Central',
    AQHI: 4.089,
  },
  {
    'Month of Year': 201811,
    District: 'Mong Kok',
    AQHI: 4.003,
  },
  {
    'Month of Year': 201812,
    District: 'Central/Western',
    AQHI: 3.355,
  },
  {
    'Month of Year': 201812,
    District: 'Eastern',
    AQHI: 3.329,
  },
  {
    'Month of Year': 201812,
    District: 'Kwun Tong',
    AQHI: 3.333,
  },
  {
    'Month of Year': 201812,
    District: 'Sham Shui Po',
    AQHI: 3.213,
  },
  {
    'Month of Year': 201812,
    District: 'Kwai Chung',
    AQHI: 3.152,
  },
  {
    'Month of Year': 201812,
    District: 'Tsuen Wan',
    AQHI: 3.164,
  },
  {
    'Month of Year': 201812,
    District: 'Tseung Kwan O',
    AQHI: 3.234,
  },
  {
    'Month of Year': 201812,
    District: 'Yuen Long',
    AQHI: 3.222,
  },
  {
    'Month of Year': 201812,
    District: 'Tuen Mun',
    AQHI: 3.403,
  },
  {
    'Month of Year': 201812,
    District: 'Tung Chung',
    AQHI: 3.092,
  },
  {
    'Month of Year': 201812,
    District: 'Tai Po',
    AQHI: 3.101,
  },
  {
    'Month of Year': 201812,
    District: 'Sha Tin',
    AQHI: 3.148,
  },
  {
    'Month of Year': 201812,
    District: 'Tap Mun',
    AQHI: 2.935,
  },
  {
    'Month of Year': 201812,
    District: 'Causeway Bay',
    AQHI: 3.659,
  },
  {
    'Month of Year': 201812,
    District: 'Central',
    AQHI: 3.681,
  },
  {
    'Month of Year': 201812,
    District: 'Mong Kok',
    AQHI: 3.495,
  },
  {
    'Month of Year': 201901,
    District: 'Central/Western',
    AQHI: 4.134,
  },
  {
    'Month of Year': 201901,
    District: 'Eastern',
    AQHI: 3.959,
  },
  {
    'Month of Year': 201901,
    District: 'Kwun Tong',
    AQHI: 4.015,
  },
  {
    'Month of Year': 201901,
    District: 'Sham Shui Po',
    AQHI: 4.005,
  },
  {
    'Month of Year': 201901,
    District: 'Kwai Chung',
    AQHI: 3.986,
  },
  {
    'Month of Year': 201901,
    District: 'Tsuen Wan',
    AQHI: 4.099,
  },
  {
    'Month of Year': 201901,
    District: 'Tseung Kwan O',
    AQHI: 3.964,
  },
  {
    'Month of Year': 201901,
    District: 'Yuen Long',
    AQHI: 4.04,
  },
  {
    'Month of Year': 201901,
    District: 'Tuen Mun',
    AQHI: 3.937,
  },
  {
    'Month of Year': 201901,
    District: 'Tung Chung',
    AQHI: 4.066,
  },
  {
    'Month of Year': 201901,
    District: 'Tai Po',
    AQHI: 3.942,
  },
  {
    'Month of Year': 201901,
    District: 'Sha Tin',
    AQHI: 3.837,
  },
  {
    'Month of Year': 201901,
    District: 'Tap Mun',
    AQHI: 3.565,
  },
  {
    'Month of Year': 201901,
    District: 'Causeway Bay',
    AQHI: 4.375,
  },
  {
    'Month of Year': 201901,
    District: 'Central',
    AQHI: 4.505,
  },
  {
    'Month of Year': 201901,
    District: 'Mong Kok',
    AQHI: 4.324,
  },
  {
    'Month of Year': 201902,
    District: 'Central/Western',
    AQHI: 3.241,
  },
  {
    'Month of Year': 201902,
    District: 'Eastern',
    AQHI: 3.196,
  },
  {
    'Month of Year': 201902,
    District: 'Kwun Tong',
    AQHI: 3.227,
  },
  {
    'Month of Year': 201902,
    District: 'Sham Shui Po',
    AQHI: 3.196,
  },
  {
    'Month of Year': 201902,
    District: 'Kwai Chung',
    AQHI: 3.16,
  },
  {
    'Month of Year': 201902,
    District: 'Tsuen Wan',
    AQHI: 3.177,
  },
  {
    'Month of Year': 201902,
    District: 'Tseung Kwan O',
    AQHI: 3.269,
  },
  {
    'Month of Year': 201902,
    District: 'Yuen Long',
    AQHI: 3.07,
  },
  {
    'Month of Year': 201902,
    District: 'Tuen Mun',
    AQHI: 3.08,
  },
  {
    'Month of Year': 201902,
    District: 'Tung Chung',
    AQHI: 2.95,
  },
  {
    'Month of Year': 201902,
    District: 'Tai Po',
    AQHI: 3.137,
  },
  {
    'Month of Year': 201902,
    District: 'Sha Tin',
    AQHI: 3.1,
  },
  {
    'Month of Year': 201902,
    District: 'Tap Mun',
    AQHI: 3.05,
  },
  {
    'Month of Year': 201902,
    District: 'Causeway Bay',
    AQHI: 3.547,
  },
  {
    'Month of Year': 201902,
    District: 'Central',
    AQHI: 3.496,
  },
  {
    'Month of Year': 201902,
    District: 'Mong Kok',
    AQHI: 3.407,
  },
  {
    'Month of Year': 201903,
    District: 'Central/Western',
    AQHI: 3.539,
  },
  {
    'Month of Year': 201903,
    District: 'Eastern',
    AQHI: 3.608,
  },
  {
    'Month of Year': 201903,
    District: 'Kwun Tong',
    AQHI: 3.635,
  },
  {
    'Month of Year': 201903,
    District: 'Sham Shui Po',
    AQHI: 3.45,
  },
  {
    'Month of Year': 201903,
    District: 'Kwai Chung',
    AQHI: 3.579,
  },
  {
    'Month of Year': 201903,
    District: 'Tsuen Wan',
    AQHI: 3.524,
  },
  {
    'Month of Year': 201903,
    District: 'Tseung Kwan O',
    AQHI: 3.654,
  },
  {
    'Month of Year': 201903,
    District: 'Yuen Long',
    AQHI: 3.481,
  },
  {
    'Month of Year': 201903,
    District: 'Tuen Mun',
    AQHI: 3.486,
  },
  {
    'Month of Year': 201903,
    District: 'Tung Chung',
    AQHI: 3.255,
  },
  {
    'Month of Year': 201903,
    District: 'Tai Po',
    AQHI: 3.461,
  },
  {
    'Month of Year': 201903,
    District: 'Sha Tin',
    AQHI: 3.455,
  },
  {
    'Month of Year': 201903,
    District: 'Tap Mun',
    AQHI: 3.344,
  },
  {
    'Month of Year': 201903,
    District: 'Causeway Bay',
    AQHI: 3.832,
  },
  {
    'Month of Year': 201903,
    District: 'Central',
    AQHI: 3.867,
  },
  {
    'Month of Year': 201903,
    District: 'Mong Kok',
    AQHI: 3.729,
  },
  {
    'Month of Year': 201904,
    District: 'Central/Western',
    AQHI: 3.403,
  },
  {
    'Month of Year': 201904,
    District: 'Eastern',
    AQHI: 3.459,
  },
  {
    'Month of Year': 201904,
    District: 'Kwun Tong',
    AQHI: 3.601,
  },
  {
    'Month of Year': 201904,
    District: 'Sham Shui Po',
    AQHI: 3.297,
  },
  {
    'Month of Year': 201904,
    District: 'Kwai Chung',
    AQHI: 3.416,
  },
  {
    'Month of Year': 201904,
    District: 'Tsuen Wan',
    AQHI: 3.222,
  },
  {
    'Month of Year': 201904,
    District: 'Tseung Kwan O',
    AQHI: 3.506,
  },
  {
    'Month of Year': 201904,
    District: 'Yuen Long',
    AQHI: 3.369,
  },
  {
    'Month of Year': 201904,
    District: 'Tuen Mun',
    AQHI: 3.248,
  },
  {
    'Month of Year': 201904,
    District: 'Tung Chung',
    AQHI: 3.195,
  },
  {
    'Month of Year': 201904,
    District: 'Tai Po',
    AQHI: 3.38,
  },
  {
    'Month of Year': 201904,
    District: 'Sha Tin',
    AQHI: 3.341,
  },
  {
    'Month of Year': 201904,
    District: 'Tap Mun',
    AQHI: 3.306,
  },
  {
    'Month of Year': 201904,
    District: 'Causeway Bay',
    AQHI: 3.73,
  },
  {
    'Month of Year': 201904,
    District: 'Central',
    AQHI: 3.607,
  },
  {
    'Month of Year': 201904,
    District: 'Mong Kok',
    AQHI: 3.62,
  },
];

describe('Heatmap updateConfig', () => {
  const plot = new Heatmap(createDiv(), {
    forceFit: false,
    width: 650,
    height: 500,
    data: DATA,
    xField: 'Month of Year',
    yField: 'District',
    colorField: 'AQHI',
    shapeType: 'rect',
    color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
    meta: {
      'Month of Year': {
        type: 'cat',
      },
    },
  });

  plot.render();

  it('updateConfig', async () => {
    await wait(100);
    plot.updateConfig({
      width: 820,
      height: 600,
      data: DATA,
      xField: 'Month of Year',
      yField: 'District',
      colorField: 'AQHI',
      shapeType: 'rect',
      color: ['#174c83', '#7eb6d4', '#efefeb', '#efa759', '#9b4d16'],
      meta: {
        'Month of Year': {
          type: 'cat',
        },
      },
    });
    plot.render();

    expect(plot.getView()).toBeDefined();
  });
});
