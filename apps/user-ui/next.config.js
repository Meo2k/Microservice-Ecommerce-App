//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {},
  allowedDevOrigins: ['14.225.44.169', 'localhost:3000'],
};

const plugins = [
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);