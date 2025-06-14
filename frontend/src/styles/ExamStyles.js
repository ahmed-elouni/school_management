import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    padding: 24,
  },
  evalSelection: {
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 16,
    alignItems: 'center',
  },
  stats: {
    fontSize: 16,
  }
});

export default useStyles;
