import { byTestId, createTestComponentFactory, Spectator } from '@netbasal/spectator';

import { Photo } from '../../models/photo';
import { photo1 } from '../../spec-helpers/photo.spec-helper';
import { PhotoItemComponent } from './photo-item.component';

describe('PhotoItemComponent with spectator', () => {
  let spectator: Spectator<PhotoItemComponent>;

  const create = createTestComponentFactory({
    component: PhotoItemComponent,
    shallow: true
  });

  beforeEach(() => {
    spectator = create({ photo: photo1 });
  });

  it('renders a link and a thumbnail', () => {
    const link = spectator.query(byTestId('link'));
    expect(link).toHaveAttribute('href', photo1.link);

    const img = spectator.query(byTestId('image'));
    expect(img).toHaveAttribute('src', photo1.media.m);
    expect(img).toHaveAttribute('alt', photo1.title);
  });

  it('focusses a photo on click', (done: DoneFn) => {
    spectator.component.focusPhoto.subscribe((otherPhoto: Photo) => {
      expect(otherPhoto).toBe(photo1);
      done();
    });

    spectator.click(
      spectator.query(byTestId('link'))
    );
  });

});
