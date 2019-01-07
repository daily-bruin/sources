import * as React from 'react';
import { Footer, Span } from 'glamorous';

import SourcesFooterLink from './SourcesFooterLink';

const SourcesFooter = () => (
  <Footer
    display="flex"
    justifyContent="center"
    marginBottom="1rem"
    textAlign="center"
  >
    <div className="footer__text">
      <div>
        Site code{' '}
        <SourcesFooterLink href="https://github.com/dailybruin/sources">
          available on GitHub
        </SourcesFooterLink>{' '}
        and released under the{' '}
        <SourcesFooterLink href="https://www.gnu.org/licenses/agpl-3.0.html">
          GNU AGPL 3.0
        </SourcesFooterLink>.
      </div>
      <div>
        Built with Suzy’s{' '}
        <Span
          css={{
            ':hover': {
              color: 'red',
              cursor: 'default',
            },
          }}
        >
          ♥
        </Span>{' '}
        in Kerckhoff 118 by Nathan Smith.
      </div>
    </div>
  </Footer>
);

export default SourcesFooter;
