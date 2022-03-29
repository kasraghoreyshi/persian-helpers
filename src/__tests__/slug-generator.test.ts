import { generateSlug } from '../tools/slug-generator/slug-generator';

test('Generate Slug From Persian To English', () => {
  expect(generateSlug('سلام دنیا 💕', { separator: '-' })).toBe('slam-dnya');
  expect(generateSlug(' سلام دنیا ', { separator: '-' })).toBe('slam-dnya');
  expect(generateSlug('سلام دنیا 💕!!!!!!!!!!!!!!!', { separator: '-' })).toBe('slam-dnya');
  expect(generateSlug('سلام----دنیا*(&78s78', { separator: '-' })).toBe('slamdnya78s78');
});
test('Generate Slug From Persian To English With Unique Separator', () => {
  expect(generateSlug('سلام دنیا 💕', { separator: '_' })).toBe('slam_dnya');
});
test('Generate Slug From Persian To Persian', () => {
  expect(generateSlug('سلام دنیا 💕', { separator: '-', to: 'fa' })).toBe('سلام-دنیا');
});
