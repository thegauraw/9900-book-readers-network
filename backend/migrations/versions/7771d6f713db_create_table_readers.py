"""create table readers

Revision ID: 7771d6f713db
Revises: 
Create Date: 2022-03-13 12:37:08.735082

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7771d6f713db'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('readers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password_hash', sa.String(length=120), nullable=False),
    sa.Column('status', sa.Boolean(), default=True, server_default="true", nullable=True),
    sa.Column('gender', sa.String(length=5), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username'))
    
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('readers')
    # ### end Alembic commands ###
