import faker from 'faker';
import getConfig from '../../src/config';

const mockedShema = jest.fn();

jest.mock('../../src/config/config-schema', () => ({
  validate: (vars: Partial<NodeJS.ProcessEnv>) => mockedShema(vars),
}));

describe('CONFIG - Units tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const makeEnvs = () => ({
    PORT: faker.random.number(9999),
    NODE_ENV: faker.random.word(),
  });
  it('should return a valid object', () => {
    const vars = makeEnvs();
    mockedShema.mockImplementation(() => ({ value: vars }));
    const config = getConfig();
    expect(typeof config).toBe('object');
    expect(config).toHaveProperty('port', vars.PORT);
    expect(config).toHaveProperty('env', vars.NODE_ENV);
  });

  it('should throw error when passing invalid values', async () => {
    mockedShema.mockImplementation(() => ({
      error: { message: '"PORT" must be a string' },
    }));

    await expect(() => getConfig()).toThrow('Environment\'s variable validation error: "PORT" must be a string');
  });
});
